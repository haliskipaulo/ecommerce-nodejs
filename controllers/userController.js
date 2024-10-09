
class UserController{
    constructor(UserService){
        this.userService = UserService;
    }

    async createUser(req, res){
        const { email, date_birth, password } = req.body;

        try {
            const newUser = await this.userService.createUserSVC(email, date_birth, password);
            return res.status(200).json({ message: 'Usuário registrado', user: newUser });
        } catch(err) {
            return res.status(500).json({ error: "Erro ao gravar novo usuário." }); 
        };
    };

    async login(req, res){
        const { email, password } = req.body;
        try {
            const user = await this.userService.loginSVC(email, password);
            return res.status(200).json({ message: 'Login realizado', user: user });
        } catch(err) {
            return res.status(401).json({ error: err.mensage});
        }
    }
}

module.exports = UserController;