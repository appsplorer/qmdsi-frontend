import sqlite3
from schemas import PersonalInformation, Nominee, DBUser, Refs, VerficationData


def create_tables():
    conn = sqlite3.connect("my_database.db")
    cur = conn.cursor()
    cur.execute(
        """ CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            country TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            phone_number TEXT NOT NULL UNIQUE,
            ref_link TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            full_name TEXT NOT NULL,
            ref_by TEXT,
            created_at DATE DEFAULT (DATE('now')),
            email_verified BOOLEAN DEFAULT false,
            kyc_verified BOOLEAN DEFAULT false
        )
    """
    )
    cur.execute(
        """ CREATE TABLE IF NOT EXISTS bind_users (
        id TEXT PRIMARY KEY,
        binded BOOLEAN DEFAULT false
    )
    """
    )

    cur.execute(
        """ CREATE TABLE IF NOT EXISTS personal_information (
                id TEXT PRIMARY KEY,
                first_name TEXT NOT NULL,
                middle_name TEXT NOT NULL,
                last_name TEXT NOT NULL,    
                employee_name  TEXT NOT NULL,
                income_per_annum REAL NOT NULL,
                date_of_birth TEXT NOT NULL,
                address TEXT NOT NULL,
                city TEXT NOT NULL,
                postal_code TEXT NOT NULL,
                country TEXT NOT NULL,
                citizenship TEXT NOT NULL,
                currency TEXT NOT NULL,
                mother_name TEXT NOT NULL,
                income_tax_no TEXT NOT NULL,
                id_type TEXT NOT NULL,
                id_number INTGER NOT NULL,
                industry TEXT NOT NULL,
                occupation TEXT NOT NULL,
                source_of_income TEXT NOT NULL,
                mobile_phone TEXT NOT NULL,
                phone_2 TEXT NOT NULL,
                fax_no TEXT NOT NULL,
                marital_status TEXT NOT NULL,
                gender TEXT NOT NULL
            )            
    """
    )

    cur.execute(
        """CREATE TABLE IF NOT EXISTS nominee (
                id TEXT PRIMARY KEY,
                first_name TEXT NOT NULL,
                middle_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                date_of_birth TEXT NOT NULL,
                address TEXT NOT NULL,
                city TEXT NOT NULL,
                relationship_to_testator TEXT NOT NULL,
                postal_code TEXT NOT NULL,
                country TEXT NOT NULL,
                contact_info TEXT NOT NULL,
                id_type TEXT NOT NULL,
                id_number TEXT NOT NULL
                )
        """
    )

    cur.execute(
        """CREATE TABLE IF NOT EXISTS verifications (
                id TEXT PRIMARY KEY,
                user_id TEXT NOT NULL,
                credentials_verified BOOLEAN DEFAULT FALSE,
                completed BOOLEAN DEFAULT FALSE
                )
        """
    )

    conn.commit()
    conn.close()


def create_personal_info(_id: str, info: PersonalInformation):
    conn = sqlite3.connect("my_database.db")

    cursor = conn.cursor()
    new_record = info.model_dump()
    new_record["id"] = _id

    columns = ", ".join(new_record.keys())
    placeholders = ", ".join(["?"] * len(new_record))
    values = list(new_record.values())

    sql = f"INSERT INTO personal_information ({columns}) VALUES ({placeholders})"
    cursor.execute(sql, values)
    conn.commit()
    conn.close()
    return cursor.lastrowid


def update_personal_info(_id: str, info: PersonalInformation):
    conn = sqlite3.connect("my_database.db")
    cursor = conn.cursor()

    new_record = info.model_dump()
    set_clause = ", ".join([f"{key} = ?" for key in new_record.keys()])
    values = list(new_record.values())
    values.append(_id)
    sql = f"UPDATE personal_information SET {set_clause} WHERE id = ?"

    cursor.execute(sql, values)
    conn.commit()
    conn.close()

    return cursor.rowcount


def get_personal_information(_id: str) -> PersonalInformation | None:
    conn = sqlite3.connect("my_database.db")

    cur = conn.cursor()
    info = cur.execute(
        "SELECT * FROM  personal_information where  id = ?", (_id,)
    ).fetchone()
    columns = [description[0] for description in cur.description]
    if not info:
        return None

    info = dict(zip(columns, info))
    parsed = PersonalInformation.model_validate(info)
    return parsed


def update_personal_information(_id: str, info: PersonalInformation):
    conn = sqlite3.connect("my_database.db")
    cur = conn.cursor()
    update_data = info.model_dump(exclude_unset=True)
    set_clause = ", ".join([f"{key} = ?" for key in update_data.keys()])
    sql = f"UPDATE personal_information SET {set_clause} WHERE id = ?"
    params = list(update_data.values()) + [_id]

    cur.execute(sql, params)
    conn.commit()
    conn.close()
    return cur.rowcount > 0


def update_user_kyc_data(_id: str):
    conn = sqlite3.connect("my_database.db")
    cur = conn.cursor()
    sql = "UPDATE users SET kyc_verified = TRUE WHERE id = ?"
    cur.execute(sql, (_id,))  # Pass _id as a tuple
    conn.commit()
    conn.close()
    return cur.rowcount > 0


def create_nominee(_id: str, info: Nominee):
    conn = sqlite3.connect("my_database.db")

    cursor = conn.cursor()
    new_record = info.model_dump()
    new_record["id"] = _id

    columns = ", ".join(new_record.keys())
    placeholders = ", ".join(["?"] * len(new_record))
    values = list(new_record.values())

    sql = f"INSERT INTO nominee ({columns}) VALUES ({placeholders})"
    cursor.execute(sql, values)
    conn.commit()
    conn.close()
    return cursor.lastrowid


def update_nominee_info(_id: str, info: Nominee):
    conn = sqlite3.connect("my_database.db")
    cursor = conn.cursor()

    new_record = info.model_dump()
    set_clause = ", ".join([f"{key} = ?" for key in new_record.keys()])
    values = list(new_record.values())
    values.append(_id)
    sql = f"UPDATE nominee SET {set_clause} WHERE id = ?"

    cursor.execute(sql, values)
    conn.commit()
    conn.close()

    return cursor.rowcount


def update_user(email: str, update: dict):
    conn = sqlite3.connect("my_database.db")
    cursor = conn.cursor()

    set_clause = ", ".join([f"{key} = ?" for key in update.keys()])
    values = list(update.values())
    values.append(email)
    sql = f"UPDATE users SET {set_clause} WHERE email = ?"

    cursor.execute(sql, values)
    conn.commit()
    conn.close()

    return cursor.rowcount


# def update_nominee_info(_id: str, update: dict):
#     conn = sqlite3.connect("my_database.db")
#     cursor = conn.cursor()

#     set_clause = ", ".join([f"{key} = ?" for key in update.keys()])
#     values = list(update.values())
#     values.append(email)
#     sql = f"UPDATE users SET {set_clause} WHERE email = ?"

#     cursor.execute(sql, values)
#     conn.commit()
#     conn.close()

#     return cursor.rowcount


def get_nominee(_id: str) -> Nominee | None:
    conn = sqlite3.connect("my_database.db")

    cur = conn.cursor()
    info = cur.execute("SELECT * FROM  nominee where  id = ?", (_id,)).fetchone()
    columns = [description[0] for description in cur.description]
    if not info:
        return None

    dict_info = dict(zip(columns, info))
    parsed = Nominee.model_validate(dict_info)
    return parsed


def create_user(user: DBUser):
    conn = sqlite3.connect("my_database.db")
    cursor = conn.cursor()
    new_user = user.model_dump(exclude_none=True)

    columns = ", ".join(new_user.keys())
    placeholders = ", ".join(["?"] * len(new_user))
    values = list(new_user.values())

    sql = f"INSERT INTO users ({columns}) VALUES ({placeholders})"
    cursor.execute(sql, values)
    conn.commit()
    conn.close()
    return cursor.lastrowid


def get_user(_id: str) -> DBUser | None:

    conn = sqlite3.connect("my_database.db")

    cur = conn.cursor()
    info = cur.execute("SELECT * FROM  users where  id = ?", (_id,)).fetchone()
    columns = [description[0] for description in cur.description]
    if not info:
        return None

    dict_info = dict(zip(columns, info))
    parsed = DBUser.model_validate(dict_info)
    return parsed


def get_user_by_email(email: str) -> DBUser | None:

    conn = sqlite3.connect("my_database.db")

    cur = conn.cursor()
    info = cur.execute("SELECT * FROM  users where  email = ?", (email,)).fetchone()
    columns = [description[0] for description in cur.description]
    if not info:
        return None

    dict_info = dict(zip(columns, info))
    parsed = DBUser.model_validate(dict_info)
    return parsed


def get_user_by_phone(phone: str) -> DBUser | None:

    conn = sqlite3.connect("my_database.db")

    cur = conn.cursor()
    info = cur.execute(
        "SELECT * FROM  users where  phone_number = ?", (phone,)
    ).fetchone()
    columns = [description[0] for description in cur.description]
    if not info:
        return None

    dict_info = dict(zip(columns, info))
    parsed = DBUser.model_validate(dict_info)
    return parsed


def user_refs(ref_by: str):
    conn = sqlite3.connect("my_database.db")
    cur = conn.cursor()
    refs = cur.execute(
        "SELECT created_at, email from users where ref_by =? ", (ref_by,)
    )
    parsed = [Refs(created_at=ref[0], email=ref[1]) for ref in refs]
    cur.close()
    conn.close()
    return parsed


def bind_user(_id: str):
    conn = sqlite3.connect("my_database.db")
    cur = conn.cursor()
    cur.execute("INSERT INTO bind_users VALUES (?, ?)", (_id, True))
    conn.commit()
    return True


def get_binded_user(_id: str):
    conn = sqlite3.connect("my_database.db")
    cur = conn.cursor()
    bind_user = cur.execute("SELECT * from bind_users where id = ? ", (_id,)).fetchone()
    conn.close()
    return bind_user


def get_user_verification(
    _id: str,
) -> VerficationData | None:
    conn = sqlite3.connect("my_database.db")
    cur = conn.cursor()
    verification = cur.execute(
        "SELECT * from verifications where user_id = ? ", (_id,)
    ).fetchone()
    if not verification:
        return None
    conn.close()
    return VerficationData(
        id=verification[0],
        user_id=verification[1],
        credentials_verified=bool(verification[2]),
        completed=bool(verification[3]),
    )


def create_verification(
    verification_id: str,
    user_id: str,
):
    conn = sqlite3.connect("my_database.db")
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO verifications (id, user_id) VALUES (?, ?)",
        (verification_id, user_id),
    )
    conn.commit()
    conn.close()
    return True


def update_verification_info(_id: str, new_data: dict):
    conn = sqlite3.connect("my_database.db")
    cursor = conn.cursor()
   
    set_clause = ", ".join([f"{key} = ?" for key in new_data.keys()])
    values = list(new_data.values())
    values.append(_id)
    sql = f"UPDATE verifications SET {set_clause} WHERE id = ?"

    cursor.execute(sql, values)
    conn.commit()
    conn.close()
    return cursor.rowcount


create_tables()
