import psycopg2
import socket

# Force IPv4
socket.AF_INET6 = socket.AF_INET

try:
    conn = psycopg2.connect(
        host="db.gcxchyvdzhvmldynfpwn.supabase.co",
        database="postgres",
        user="postgres",
        password="bbIPJFYBXejFEObl"
    )
    print("Подключение успешно!")
    conn.close()
except Exception as e:
    print(f"Ошибка подключения: {e}") 