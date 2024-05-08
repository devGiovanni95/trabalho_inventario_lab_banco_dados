import  express, { json, response }  from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { deleteEmployee, findAllEmployees, findAndUpdateByIdEmployee, insertNewEmployee, updateAcessorios, updateCelular, updateDesktop, updateMonitor1, updateMonitor2, updateMouse, updateNobreak, updateNotebook, updateTeclado } from './src/controllers'
dotenv.config()
const app = express()
const port = 3008

app.use(cors())
app.use(express.json())

app.post(`/employee`,async (req, res) => {
    const { name, cpf } = req.body;
    try {
        const insert = await insertNewEmployee(name, cpf);
        res.status(200).json({ message: 'Funcionário inserido com sucesso', result: insert });
        
    } catch (error) {
        res.status(500).json({ message: 'Erro ao inserir funcionário', error: error });
    }
});

app.delete(`/employee/:cpf`,async (req, res) => {
    const { cpf } = req.params;
    try {
        const result = await deleteEmployee(cpf)
        if(result?.deletedCount != 0){
            res.status(200).json({ message: 'Funcionário deletado com sucesso' });
        }else{
            res.status(404).json({ message: 'Funcionário não existente' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Erro ao inserir funcionário', error: error });
    }
})

app.get(`/employees`,async (req, res) => {
    try {
        const result = await findAllEmployees()
            res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao inserir funcionário', error: error });
    }
})

app.put(`/employee/:cpf`,async (req, res) => {
    try {
        const { cpf } = req.params;
        const { name } = req.body;
        const result = await findAndUpdateByIdEmployee(cpf, name)
            res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao inserir funcionário', error: error });
    }
})

app.put(`/notebook/:cpf`,async (req, res) => {
    try {
        const { cpf } = req.params;
        const { notebook } = req.body;
        const result = await updateNotebook(cpf, notebook)
            res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao inserir notebook', error: error });
    }
})

app.put(`/desktop/:cpf`,async (req, res) => {
    try {
        const { cpf } = req.params;
        const { desktop } = req.body;
        const result = await updateDesktop(cpf, desktop)
            res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao inserir desktop', error: error });
    }
})

app.put(`/monitor1/:cpf`,async (req, res) => {
    try {
        const { cpf } = req.params;
        const { monitor } = req.body;
        const result = await updateMonitor1(cpf, monitor)
            res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao inserir monitor 1', error: error });
    }
})

app.put(`/monitor2/:cpf`,async (req, res) => {
    try {
        const { cpf } = req.params;
        const { monitor } = req.body;
        const result = await updateMonitor2(cpf, monitor)
            res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao inserir monitor 1', error: error });
    }
})

app.put(`/teclado/:cpf`,async (req, res) => {
    try {
        const { cpf } = req.params;
        const { teclado } = req.body;
        const result = await updateTeclado(cpf, teclado)
            res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao inserir teclado', error: error });
    }
})

app.put(`/mouse/:cpf`,async (req, res) => {
    try {
        const { cpf } = req.params;
        const { mouse } = req.body;
        const result = await updateMouse(cpf, mouse)
            res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao inserir mouse', error: error });
    }
})

app.put(`/acessorios/:cpf`,async (req, res) => {
    try {
        const { cpf } = req.params;
        const { acessorios } = req.body;
        const result = await updateAcessorios(cpf, acessorios)
            res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao inserir acessorios', error: error });
    }
})

app.put(`/nobreak/:cpf`,async (req, res) => {
    try {
        const { cpf } = req.params;
        const { nobreak } = req.body;
        const result = await updateNobreak(cpf, nobreak)
            res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao inserir nobreak', error: error });
    }
})

app.put(`/nobreak/:cpf`,async (req, res) => {
    try {
        const { cpf } = req.params;
        const { nobreak } = req.body;
        const result = await updateNobreak(cpf, nobreak)
            res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao inserir nobreak', error: error });
    }
})

app.put(`/celular/:cpf`,async (req, res) => {
    try {
        const { cpf } = req.params;
        const { celular } = req.body;
        const result = await updateCelular(cpf, celular)
            res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao inserir celular', error: error });
    }
})




app.listen(port, () => {
    console.log(`Server is running in port ${port}`)
})
