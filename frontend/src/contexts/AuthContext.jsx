import { createContext, useState, useEffect } from "react";
import { getUser } from "../services/users.service";
import { setAuthToken } from "../services/api.service";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    accessToken: null,
    isLoaded : false,
  });
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setAuth({
        isAuthenticated: true,
        accessToken: token,
        isLoaded : true
      });
      setAuthToken(token);
    }else{
      setAuth({
    isAuthenticated: false,
    accessToken: null,
    isLoaded : true,
  })
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUser();
        const fullName = [
          userData.first_name,
          userData.middle_name,
          userData.last_name,
        ]
          .filter(Boolean)
          .join(" ");

        setProfile({
          id: userData.id,
          first_name: userData.first_name,
          middle_name: userData.middle_name,
          last_name: userData.last_name,
          fullName: fullName,
          phoneNumber: userData.phone_number,
          country: userData.country,
          email: userData.email,
          kycStatus: userData.kyc_verified ? "Verified" : "Not Verified",
          referralLink: userData.ref_link,
          walletAddress: userData.wallet_address,
          referralSignUps: userData.referral_sign_ups,
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    if (auth?.accessToken) {
      fetchUserData();
    }
  }, [auth?.accessToken]);

  const login = (token) => {
    localStorage.setItem("access_token", token);
    setAuth({
      isAuthenticated: true,
      accessToken: token,
    });
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setAuth({
      isAuthenticated: false,
      accessToken: null,
    });
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, profile }}>
      {children}
    </AuthContext.Provider>
  );
};
