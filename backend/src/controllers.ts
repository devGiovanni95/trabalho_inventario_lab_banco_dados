import { json, response } from "express";
import { MongoClient } from "mongodb";
const uri = "mongodb://localhost:27017/"
const collectionName = 'ti'
const dbName = 'inventario'

// export async function connectAndFindWithPagination(skip: number) {
//     const client = new MongoClient(uri)
//     try {
//         await client.connect();
//         console.log("Conexao estabelecida");
//         const db = client.db(dbName);
//         const collection = db.collection(collectionName);
//         const result = await collection.find({}).skip(skip).limit(10).toArray()
//         return result
//     } catch(error) {
//         console.log("Algo deu errado: ", error)
//     } finally {
//         await client.close();
//         console.log("Conexao fechada");
//     }
// }

export async function insertNewEmployee(name: string, cpf: string) {
    const client = new MongoClient(uri)
    try {
        await client.connect();
        console.log("Conexao estabelecida");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.insertOne({
            name: name,
            cpf: cpf
        })
        return result
    } catch(error) {
        console.log("Algo deu errado: ", error)
    } finally {
        await client.close();
        console.log("Conexao fechada");
    }
}


export async function deleteEmployee( cpf: string) {
    const client = new MongoClient(uri)
    try {
        await client.connect();
        console.log("Conexao estabelecida");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.deleteOne({
            cpf: cpf
        })
        return result
    } catch(error) {
        console.log("Algo deu errado: ", error)
    } finally {
        await client.close();
        console.log("Conexao fechada");
    }
}

export async function findAllEmployees() {
    const client = new MongoClient(uri)
    try {
        await client.connect();
        console.log("Conexao estabelecida");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.find().toArray()
        if(result.length === 0){
            return "Sem funcionários cadastrados no banco de dados"
        }else{
            return result
        }
    } catch(error) {
        console.log("Algo deu errado: ", error)
    } finally {
        await client.close();
        console.log("Conexao fechada");
    }
}

export async function findAndUpdateByIdEmployee( cpf: string, name: string) {
    const client = new MongoClient(uri)
    try {
        await client.connect();
        console.log("Conexao estabelecida");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        
        if(name != ''){

            const result = await collection.updateOne({
                cpf: cpf
            },{
                $set: {
                    name: name
                }
            })

            if(result.modifiedCount != 0 ){
                return result
            }else{
                return "Erro ao atualizar registro, verifique se o nome atualizado esta diferente do atual ou se o cpf esta correto"
            }
        }else{
            return "O campo nome e obrigatorio"
        }

        } catch(error) {
        console.log("Algo deu errado: ", error)
    } finally {
        await client.close();
        console.log("Conexao fechada");
    }
}