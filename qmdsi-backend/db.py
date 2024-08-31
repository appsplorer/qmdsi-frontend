import sqlite3
from schemas import PersonalInformation, Nominee, DBUser, Refs



def create_tables():
    conn = sqlite3.connect('my_database.db')
    cur = conn.cursor()
    cur.execute(''' CREATE TABLE IF NOT EXISTS users (
            wallet_address TEXT PRIMARY KEY,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            full_name TEXT NOT NULL,
            ref_by TEXT,
            created_at DATE DEFAULT (DATE('now'))
        )
    ''')
    cur.execute(''' CREATE TABLE IF NOT EXISTS bind_users (
        wallet_address TEXT PRIMARY KEY,
        binded BOOLEAN DEFAULT false
    )
    ''')

    cur.execute(''' CREATE TABLE IF NOT EXISTS personal_information (
                wallet_address TEXT PRIMARY KEY,
                name TEXT NOT NULL,    
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
                email TEXT NOT NULL,
                email2 TEXT NOT NULL,
                mobile_phone TEXT NOT NULL,
                phone_2 TEXT NOT NULL,
                fax_no TEXT NOT NULL,
                marital_status TEXT NOT NULL,
                gender TEXT NOT NULL,
                image BLOB DEFAULT NULL
            )            
    ''')
    
    cur.execute('''CREATE TABLE IF NOT EXISTS nominee (
                wallet_address TEXT PRIMARY KEY,
                first_name TEXT NOT NULL,
                middle_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                date_of_birth TEXT NOT NULL,
                address TEXT NOT NULL,
                city TEXT NOT NULL,
                postal_code TEXT NOT NULL,
                country TEXT NOT NULL,
                relationship TEXT NOT NULL,
                contact_info TEXT NOT NULL,
                id_type TEXT NOT NULL,
                id_number TEXT NOT NULL
                )
        ''')
    conn.commit()
    conn.close()


def create_personal_info(wallet_address : str, info : PersonalInformation):
    conn = sqlite3.connect('my_database.db')

    cursor = conn.cursor()
    new_record = info.model_dump()
    new_record['wallet_address'] = wallet_address.lower()
    
    columns = ', '.join(new_record.keys())
    placeholders = ', '.join(['?'] * len(new_record))
    values = list(new_record.values())

    sql = f"INSERT INTO personal_information ({columns}) VALUES ({placeholders})"
    cursor.execute(sql, values)
    conn.commit()
    conn.close()
    return cursor.lastrowid



def update_image(wallet_address, image_path):
    conn = sqlite3.connect('my_database.db')

    cursor = conn.cursor()
    cursor.execute("""
        UPDATE personal_information
        SET image = ?
        WHERE wallet_address = ?
    """, (image_path, wallet_address))
    conn.commit()
    conn.close()
    return cursor.lastrowid


def get_personal_information(
    address : str
) -> PersonalInformation | None:
    conn = sqlite3.connect('my_database.db')


    address = address.lower()
    cur = conn.cursor()
    info = cur.execute("SELECT * FROM  personal_information where  wallet_address = ?", 
                       (address, )).fetchone()
    columns = [description[0] for description in cur.description]
    if not info:
        return None 
    
    info = dict(zip(columns, info))
    parsed  = PersonalInformation.model_validate(info)
    return parsed 


def update_personal_information(wallet_address: str, info: PersonalInformation):
    conn = sqlite3.connect('my_database.db')
    cur = conn.cursor()
    update_data = info.model_dump(exclude_unset=True)
    set_clause = ', '.join([f"{key} = ?" for key in update_data.keys()])
    sql = f"UPDATE personal_information SET {set_clause} WHERE wallet_address = ?"
    params = list(update_data.values()) + [wallet_address]
    
    cur.execute(sql, params)
    conn.commit()
    conn.close()
    return cur.rowcount > 0


def create_nominee(wallet_address : str, info : Nominee):
    conn = sqlite3.connect('my_database.db')

    cursor = conn.cursor()
    new_record = info.model_dump()
    new_record['wallet_address'] = wallet_address.lower()
    
    columns = ', '.join(new_record.keys())
    placeholders = ', '.join(['?'] * len(new_record))
    values = list(new_record.values())

    sql = f"INSERT INTO nominee ({columns}) VALUES ({placeholders})"
    cursor.execute(sql, values)
    conn.commit()
    conn.close()
    return cursor.lastrowid


def get_nominee(wallet_address : str) ->Nominee | None:
    conn = sqlite3.connect('my_database.db')


    address = wallet_address.lower()
    cur = conn.cursor()
    info = cur.execute("SELECT * FROM  nominee where  wallet_address = ?", 
                       (address, )).fetchone()
    columns = [description[0] for description in cur.description]
    if not info:
        return None 
    
    dict_info = dict(zip(columns, info))
    parsed  = Nominee.model_validate(dict_info)
    return parsed 


def create_user(user : DBUser):
    conn = sqlite3.connect('my_database.db')

    cursor = conn.cursor()
    new_user  = user.model_dump(exclude_unset=True, exclude_none=True)
    
    
    columns = ', '.join(new_user.keys())
    placeholders = ', '.join(['?'] * len(new_user))
    values = list(new_user.values())

    sql = f"INSERT INTO users ({columns}) VALUES ({placeholders})"
    cursor.execute(sql, values)
    conn.commit()
    conn.close()
    return cursor.lastrowid


def get_user(
    address : str
) -> DBUser | None:
    
    conn = sqlite3.connect('my_database.db')
    
    address = address.lower()
    cur = conn.cursor()
    info = cur.execute("SELECT * FROM  users where  wallet_address = ?", 
                       (address, )).fetchone()
    columns = [description[0] for description in cur.description]
    if not info:
        return None 
    
    dict_info = dict(zip(columns, info))
    parsed  = DBUser.model_validate(dict_info)
    return parsed 


def user_refs(ref_by :str ):
    conn = sqlite3.connect('my_database.db')
    cur = conn.cursor()
    refs = cur.execute("SELECT created_at, wallet_address from users where ref_by =? ", (ref_by, ))
    parsed = [Refs(created_at=ref[0], wallet_address=ref[1]) for ref in refs]
    return parsed


def bind_user(address : str):
    address = address.lower()
    conn = sqlite3.connect('my_database.db')
    cur = conn.cursor()
    cur.execute("INSERT INTO bind_users VALUES (?, ?)", (address, True))
    conn.commit()
    return True
    

def get_binded_user(address : str):
    address = address.lower()
    conn = sqlite3.connect('my_database.db')
    cur = conn.cursor()
    bind_user = cur.execute("SELECT * from bind_users where wallet_address =? ", (address)).fetchone()
    conn.close()
    return bind_user


create_tables()