const database = require('../services/database');
const { create, update } = require('../services/database');


module.exports = {
    async show(req, res) {
        const { id_cliente } = req.body;
        if (!id_cliente) return res.status(400).json({ error: 'Dados incorretos' });

        const data = await database.findByCliente(id_cliente)
        if (data.length === 0) return res.status(500).json({ error: `Não existe dividas para o usuário ${cliente}` })
        return res.status(200).json(data)
    },
    async showSingle(req, res) {
        const id_divida = req.params.id;
        if (!id_divida) return res.status(400).json({ error: 'Nenhuma ID informada' });
        const data = await database.findDivida(id_divida);
        if (data.length === 0) return res.status(400).json({ error: 'Divida não encontrada' });
        return res.status(200).json(data)
    },
    async store(req, res) {
        const { cliente, motivo, valor, date } = req.body;
        if (!cliente || !motivo || !valor || !data) return res.status(400).json({ error: 'Dados informados insuficientes' });

        try {
            const data = await database.create(cliente, motivo, valor, date);
            return res.status(200).json({ message: 'Divida cadastrada com sucesso' })
        } catch (err) {
            return res.status(500).json({ error: 'Erro interno do servidor' })
        }


    },
    async destroy(req, res) {
        const id_divida = req.params.id;
        if (!id_divida) return res.status(400).json({ error: 'Nenhuma ID informada' });
        try {
            await database.deleteById(id_divida);
            return res.status(200).json({ message: 'Divida removida com sucesso' });
        } catch (err) {
            return res.status(500).json({ error: 'Erro interno do servidor' })
        }

    },

    async update(req, res){
        const {id_dividas, cliente, motivo, valor, date } = req.body;
        if (!id_dividas || !cliente || !motivo || !valor || !data) return res.status(400).json({ error: 'Dados informados insuficientes' });

        try {
            await database.update(cliente, motivo, valor, date, id_dividas);
            return res.status(200).json({message: 'Divida atualizada com sucesso'})
        }catch(err){
            return res.status(500).json ({error: "Erro interno do servidor"})
        }
    }
}