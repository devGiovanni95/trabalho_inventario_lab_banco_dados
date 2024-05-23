import { json, response } from "express";
import { MongoClient } from "mongodb";
import { IAcessorios, ICelular, IDesktop, IHeadset, IMouse, INobreak, INotebook, IScreen1, IScreen2, ITeclado } from "./interfaces";
const uri = "mongodb://localhost:27017/"
const collectionName = 'ti'
const dbName = 'inventario'

export async function insertNewEmployee(name: string, cpf: string) {
    const client = new MongoClient(uri)
    try {
        await client.connect();
        console.log("Conexao estabelecida");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.insertOne({
            name: name,
            cpf: cpf,
            notebook : {notebook: false},
            desktop : {desktop: false},
            monitor1 : {monitor: false},
            monitor2 : {monitor: false},
            teclado : {teclado: false},
            mouse : {mouse: false},
            acessorio : {acessorio: false},
            nobreak : {nobreak: false},
            headset : {headset: false},
            celular : {celular: false},

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
            $and:[
                {cpf: cpf},
                { $and: [
                    { 'notebook.notebook': false },
                    { 'desktop.desktop': false },
                    { 'monitor1.monitor': false },
                    { 'monitor2.monitor': false },
                    { 'teclado.teclado': false },
                    { 'mouse.mouse': false },
                    { 'acessorio.acessorio': false },
                    { 'nobreak.nobreak': false },
                    { 'headset.headset': false },
                    { 'celular.celular': false }
                ]}
            ]
        })
        console.log(`Documentos excluídos: ${result.deletedCount}`);
        return result
    } catch(error) {
        console.log("Algo deu errado: ", error)
    } finally {
        await client.close();
        console.log("Conexao fechada");
    }
}

export async function findInventoryByEmployee( cpf: string ) {
    const client = new MongoClient(uri)
    try {
        await client.connect();
        console.log("Conexao estabelecida");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.find({cpf},{
        }).toArray()
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

export async function findAllEmployees() {
    const client = new MongoClient(uri)
    try {
        await client.connect();
        console.log("Conexao estabelecida");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const projection = {
            "desktop":false,
            "notebook":false,
            "monitor1":false,
            "monitor2":false,
            "teclado":false,
            "mouse":false,
            "acessorio":false,
            "nobreak":false,
            "headset":false,
            "celular":false,
        }
        const result = await collection.find({},{
            projection: projection
        }).toArray()
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

export async function updateNotebook( cpf: string, notebook: INotebook) {
    const client = new MongoClient(uri)
    try {
        await client.connect();
        console.log("Conexao estabelecida");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        
        if(notebook){
            const result = await collection.updateOne({
                cpf: cpf
            },{
                $set: {
                    notebook: notebook
                }
            })

            if(result.modifiedCount != 0 ){
                return result
            }else{
                return "Erro ao atualizar notebook"
            }
        }else{
            return "Nenhum parametro passado"
        }

        } catch(error) {
        console.log("Algo deu errado: ", error)
    } finally {
        await client.close();
        console.log("Conexao fechada");
    }
}

export async function clearNotebook( cpf: string) {
    const client = new MongoClient(uri)
    try {
        await client.connect();
        console.log("Conexao estabelecida");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
            const result = await collection.updateOne({
                cpf: cpf
            },{
                $set: {
                    notebook: {notebook: false}
                }
            })
            if(result.modifiedCount != 0 ){
                return "Item do inventário inativado com sucesso"
            }        
        } catch(error) {
        console.log("Algo deu errado: ", error)
    } finally {
        await client.close();
        console.log("Conexao fechada");
    }
}

export async function updateDesktop( cpf: string, desktop: IDesktop) {
    const client = new MongoClient(uri)
    try {
        await client.connect();
        console.log("Conexao estabelecida");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        
        if(desktop){
            const result = await collection.updateOne({
                cpf: cpf
            },{
                $set: {
                    desktop: desktop
                }
            })

            if(result.modifiedCount != 0 ){
                return result
            }else{
                return "Erro ao atualizar desktop"
            }
        }else{
            return "Nenhum parametro passado"
        }

    } catch(error) {
        console.log("Algo deu errado: ", error)
    } finally {
        await client.close();
        console.log("Conexao fechada");
    }
}

export async function clearDesktop( cpf: string) {
    const client = new MongoClient(uri)
    try {
        await client.connect();
        console.log("Conexao estabelecida");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        
            const result = await collection.updateOne({
                cpf: cpf
            },{
                $set: {
                    desktop: {
                        desktop: false
                    }
                }
            })
            if(result.modifiedCount != 0 ){
                return "Item do inventário inativado com sucesso"
            }else{
                return "Erro ao limpar desktop"
            }
    } catch(error) {
        console.log("Algo deu errado: ", error)
    } finally {
        await client.close();
        console.log("Conexao fechada");
    }
}

export async function updateMonitor1( cpf: string, monitor: IScreen1) {
    const client = new MongoClient(uri)
    try {
        await client.connect();
        console.log("Conexao estabelecida");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        
        if(monitor){
            const result = await collection.updateOne({
                cpf: cpf
            },{
                $set: {
                    monitor1: monitor
                }
            })

            if(result.modifiedCount != 0 ){
                return result
            }else{
                return "Erro ao atualizar monitor 1"
            }
        }else{
            return "Nenhum parametro passado"
        }

        } catch(error) {
        console.log("Algo deu errado: ", error)
    } finally {
        await client.close();
        console.log("Conexao fechada");
    }
}

export async function clearMonitor1( cpf: string) {
    const client = new MongoClient(uri)
    try {
        await client.connect();
        console.log("Conexao estabelecida");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
            const result = await collection.updateOne({
                cpf: cpf
            },{
                $set: {
                    monitor1: {monitor: false}
                }
            })

            if(result.modifiedCount != 0 ){
                return "Item do inventário inativado com sucesso"
            }else{
                return "Erro ao limpar monitor 1"
            }
        } catch(error) {
        console.log("Algo deu errado: ", error)
    } finally {
        await client.close();
        console.log("Conexao fechada");
    }
}

export async function updateMonitor2( cpf: string, monitor: IScreen2) {
    const client = new MongoClient(uri)
    try {
        await client.connect();
        console.log("Conexao estabelecida");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        
        if(monitor){
            const result = await collection.updateOne({
                cpf: cpf
            },{
                $set: {
                    monitor2: monitor
                }
            })

            if(result.modifiedCount != 0 ){
                return result
            }else{
                return "Erro ao atualizar monitor 2"
            }
        }else{
            return "Nenhum parametro passado"
        }

        } catch(error) {
        console.log("Algo deu errado: ", error)
    } finally {
        await client.close();
        console.log("Conexao fechada");
    }
}

export async function clearMonitor2( cpf: string) {
    const client = new MongoClient(uri)
    try {
        await client.connect();
        console.log("Conexao estabelecida");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
            const result = await collection.updateOne({
                cpf: cpf
            },{
                $set: {
                    monitor2: {monitor: false}
                }
            })

            if(result.modifiedCount != 0 ){
                return "Item do inventário inativado com sucesso"
            }else{
                return "Erro ao limpar monitor 2"
            }
        } catch(error) {
        console.log("Algo deu errado: ", error)
    } finally {
        await client.close();
        console.log("Conexao fechada");
    }
}

export async function updateTeclado( cpf: string, teclado: ITeclado) {
    const client = new MongoClient(uri)
    try {
        await client.connect();
        console.log("Conexao estabelecida");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        
        if(teclado){
            const result = await collection.updateOne({
                cpf: cpf
            },{
                $set: {
                    teclado: teclado
                }
            })

            if(result.modifiedCount != 0 ){
                return result
            }else{
                return "Erro ao atualizar teclado"
            }
        }else{
            return "Nenhum parametro passado"
        }

        } catch(error) {
        console.log("Algo deu errado: ", error)
    } finally {
        await client.close();
        console.log("Conexao fechada");
    }
}

export async function clearTeclado( cpf: string ) {
    const client = new MongoClient(uri)
    try {
        await client.connect();
        console.log("Conexao estabelecida");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        
            const result = await collection.updateOne({
                cpf: cpf
            },{
                $set: {
                    teclado: {teclado: false}
                }
            })
            if(result.modifiedCount != 0 ){
                return  "Item do inventário inativado com sucesso"
            }else{
                return "Erro ao limpar teclado"
            }
        } catch(error) {
        console.log("Algo deu errado: ", error)
    } finally {
        await client.close();
        console.log("Conexao fechada");
    }
}

export async function updateMouse( cpf: string, mouse: IMouse) {
    const client = new MongoClient(uri)
    try {
        await client.connect();
        console.log("Conexao estabelecida");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        
        if(mouse){
            const result = await collection.updateOne({
                cpf: cpf
            },{
                $set: {
                    mouse: mouse
                }
            })

            if(result.modifiedCount != 0 ){
                return result
            }else{
                return "Erro ao atualizar mouse"
            }
        }else{
            return "Nenhum parametro passado"
        }

        } catch(error) {
        console.log("Algo deu errado: ", error)
    } finally {
        await client.close();
        console.log("Conexao fechada");
    }
}

export async function clearMouse( cpf: string ) {
    const client = new MongoClient(uri)
    try {
        await client.connect();
        console.log("Conexao estabelecida");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        
            const result = await collection.updateOne({
                cpf: cpf
            },{
                $set: {
                    mouse: {mouse: false}
                }
            })

            if(result.modifiedCount != 0 ){
                return  "Item do inventário inativado com sucesso"
            }else{
                return "Erro ao limpar mouse"
            }
        } catch(error) {
        console.log("Algo deu errado: ", error)
    } finally {
        await client.close();
        console.log("Conexao fechada");
    }
}

export async function updateNobreak( cpf: string, nobreak: INobreak) {
    const client = new MongoClient(uri)
    try {
        await client.connect();
        console.log("Conexao estabelecida");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        
        if(nobreak){
            const result = await collection.updateOne({
                cpf: cpf
            },{
                $set: {
                    nobreak: nobreak
                }
            })

            if(result.modifiedCount != 0 ){
                return result
            }else{
                return "Erro ao atualizar nobreak"
            }
        }else{
            return "Nenhum parametro passado"
        }

        } catch(error) {
        console.log("Algo deu errado: ", error)
    } finally {
        await client.close();
        console.log("Conexao fechada");
    }
}

export async function clearNobreak( cpf: string ) {
    const client = new MongoClient(uri)
    try {
        await client.connect();
        console.log("Conexao estabelecida");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        
            const result = await collection.updateOne({
                cpf: cpf
            },{
                $set: {
                    nobreak: {nobreak: false}
                }
            })

            if(result.modifiedCount != 0 ){
                return  "Item do inventário inativado com sucesso"
            }else{
                return "Erro ao limpar nobreak"
            }
        } catch(error) {
        console.log("Algo deu errado: ", error)
    } finally {
        await client.close();
        console.log("Conexao fechada");
    }
}

export async function updateHeadset( cpf: string, headset: IHeadset) {
    const client = new MongoClient(uri)
    try {
        await client.connect();
        console.log("Conexao estabelecida");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        
        if(headset){
            const result = await collection.updateOne({
                cpf: cpf
            },{
                $set: {
                    headset: headset
                }
            })

            if(result.modifiedCount != 0 ){
                return result
            }else{
                return "Erro ao atualizar headset"
            }
        }else{
            return "Nenhum parametro passado"
        }

        } catch(error) {
        console.log("Algo deu errado: ", error)
    } finally {
        await client.close();
        console.log("Conexao fechada");
    }
}

export async function clearHeadset( cpf: string ) {
    const client = new MongoClient(uri)
    try {
        await client.connect();
        console.log("Conexao estabelecida");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        
            const result = await collection.updateOne({
                cpf: cpf
            },{
                $set: {
                    headset: {headset: false}
                }
            })

            if(result.modifiedCount != 0 ){
                return  "Item do inventário inativado com sucesso"
            }else{
                return "Erro ao limpar headset"
            }
        } catch(error) {
        console.log("Algo deu errado: ", error)
    } finally {
        await client.close();
        console.log("Conexao fechada");
    }
}

export async function updateAcessorios( cpf: string, acessorio: IAcessorios) {
    const client = new MongoClient(uri)
    try {
        await client.connect();
        console.log("Conexao estabelecida");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        
        if(acessorio){
            const result = await collection.updateOne({
                cpf: cpf
            },{
                $set: {
                    acessorio: acessorio
                }
            })

            if(result.modifiedCount != 0 ){
                return result
            }else{
                return "Erro ao atualizar acessório"
            }
        }else{
            return "Nenhum parametro passado"
        }

        } catch(error) {
        console.log("Algo deu errado: ", error)
    } finally {
        await client.close();
        console.log("Conexao fechada");
    }
}

export async function clearAcessorios( cpf: string ) {
    const client = new MongoClient(uri)
    try {
        await client.connect();
        console.log("Conexao estabelecida");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        
            const result = await collection.updateOne({
                cpf: cpf
            },{
                $set: {
                    acessorio: {acessorio: false}
                }
            })

            if(result.modifiedCount != 0 ){
                return  "Item do inventário inativado com sucesso"
            }else{
                return "Erro ao limpar acessório"
            }

        } catch(error) {
        console.log("Algo deu errado: ", error)
    } finally {
        await client.close();
        console.log("Conexao fechada");
    }
}

export async function updateCelular( cpf: string, celular: ICelular) {
    const client = new MongoClient(uri)
    try {
        await client.connect();
        console.log("Conexao estabelecida");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        
        if(celular){
            const result = await collection.updateOne({
                cpf: cpf
            },{
                $set: {
                    celular: celular
                }
            })

            if(result.modifiedCount != 0 ){
                return result
            }else{
                return "Erro ao atualizar celular"
            }
        }else{
            return "Nenhum parametro passado"
        }

        } catch(error) {
        console.log("Algo deu errado: ", error)
    } finally {
        await client.close();
        console.log("Conexao fechada");
    }
}

export async function clearCelular( cpf: string) {
    const client = new MongoClient(uri)
    try {
        await client.connect();
        console.log("Conexao estabelecida");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        
            const result = await collection.updateOne({
                cpf: cpf
            },{
                $set: {
                    celular: {celular: false}
                }
            })

            if(result.modifiedCount != 0 ){
                return  "Item do inventário inativado com sucesso"
            }else{
                return "Erro ao limpar celular"
            }
        } catch(error) {
        console.log("Algo deu errado: ", error)
    } finally {
        await client.close();
        console.log("Conexao fechada");
    }
}