import  express, { json, response }  from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { clearAcessorios, clearCelular, clearDesktop, clearHeadset, clearMonitor1, clearMonitor2, clearMouse, clearNobreak, clearNotebook, clearTeclado, deleteEmployee, findAllEmployees, findAndUpdateByIdEmployee, findInventoryByEmployee, insertNewEmployee, updateAcessorios, updateCelular, updateDesktop, updateHeadset, updateMonitor1, updateMonitor2, updateMouse, updateNobreak, updateNotebook, updateTeclado } from './controllers'
import swagger from 'swagger-ui-express'
import swaggerDocs from './swagger.json'
dotenv.config()
const app = express()
const port = 3000

app.use(cors({origin:'*'}))
app.use(express.json())

app.use('/api-docs', swagger.serve, swagger.setup(swaggerDocs))

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
        console.log("🚀 ~ app.delete ~ result:", result)
        if(result?.deletedCount != 0){
            res.status(200).json({ message: 'Funcionário deletado com sucesso' });
        }else{
            res.status(404).json({ message: 'Funcionário com itens no inventario, favor excluir os itens antes' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao inserir funcionário', error: error });
    }
})

app.get(`/employees`, async (req, res) => {
    try {
        const result = await findAllEmployees()
            res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao inserir funcionário', error: error });
    }
})

app.get(`/employee/:cpf`, async (req, res) => {
    try {
        const {cpf} = req.params
        const result = await findInventoryByEmployee(cpf)
            res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao procurar funcionário', error: error });
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

app.put(`/clear_notebook/:cpf`,async (req, res) => {
    try {
        const { cpf } = req.params;
        const result = await clearNotebook(cpf)
            res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao limpar notebook', error: error });
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

app.put(`/clear_desktop/:cpf`,async (req, res) => {
    try {
        const { cpf } = req.params;
        const result = await clearDesktop(cpf)
            res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao limpar desktop', error: error });
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

app.put(`/clear_monitor1/:cpf`,async (req, res) => {
    try {
        const { cpf } = req.params;
        const result = await clearMonitor1(cpf)
            res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao limpar monitor 1', error: error });
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

app.put(`/clear_monitor2/:cpf`,async (req, res) => {
    try {
        const { cpf } = req.params;
        const result = await clearMonitor2(cpf)
            res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao limpar monitor 2', error: error });
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

app.put(`/clear_teclado/:cpf`,async (req, res) => {
    try {
        const { cpf } = req.params;
        const result = await clearTeclado(cpf)
            res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao limpar teclado', error: error });
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

app.put(`/clear_mouse/:cpf`,async (req, res) => {
    try {
        const { cpf } = req.params;
        const result = await clearMouse(cpf)
            res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao limpar mouse', error: error });
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

app.put(`/clear_acessorios/:cpf`,async (req, res) => {
    try {
        const { cpf } = req.params;
        const result = await clearAcessorios(cpf)
            res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao limpar acessorios', error: error });
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

app.put(`/clear_nobreak/:cpf`,async (req, res) => {
    try {
        const { cpf } = req.params;
        const result = await clearNobreak(cpf)
            res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao limpar nobreak', error: error });
    }
})

app.put(`/headset/:cpf`,async (req, res) => {
    try {
        const { cpf } = req.params;
        const { headset } = req.body;
        const result = await updateHeadset(cpf, headset)
            res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao inserir headset', error: error });
    }
})

app.put(`/clear_headset/:cpf`,async (req, res) => {
    try {
        const { cpf } = req.params;
        const result = await clearHeadset(cpf)
            res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao limpar headset', error: error });
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

app.put(`/clear_celular/:cpf`,async (req, res) => {
    try {
        const { cpf } = req.params;
        const result = await clearCelular(cpf)
            res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao limpar celular', error: error });
    }
})

app.listen(port, () => {
    console.log(`Server is running in port ${port}`)
})
