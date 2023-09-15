// Instalasi App
- "npm install" untuk meningstal package
- inisiasi database  :  
    -> Buat database dengan format : 
        "username": "postgres",
        "password": "postgres",
        "database": "app_db",
        "host": "127.0.0.1",
        "dialect": "postgres"
    -> npx sequelize-cli model:generate --name User --attributes nomorKaryawan:string,username:string,password:string,nama:string,tglLahir:string
    -> npx sequelize-cli db:migrate

- "npm run dev" untuk menjalankan server backend di PORT 2000
