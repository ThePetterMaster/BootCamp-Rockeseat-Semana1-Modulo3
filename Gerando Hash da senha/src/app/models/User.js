import Sequelize, {Model} from 'sequelize'
import bcrypt from 'bcryptjs'

class User extends Model{
    static init(sequelize){
        super.init({
            name:Sequelize.STRING,
            email:Sequelize.STRING,
            //Esse campo não irá existir no banco de dados
            password:Sequelize.VIRTUAL,
            password_hash:Sequelize.STRING,
            provider:Sequelize.BOOLEAN,
        },
        {
            sequelize,
        }
        );
        //Hooks são códigos que executam baseados em ações no código
        //Nesse caso irá executar antes de ser salvado
        //Esse 8 é o nível da criptografia
        this.addHook('beforeSave',async (user)=>{
            if(user.password){
                user.password_hash=await bcrypt.hash(user.password,8)
            }
        })

        return this;

    }
}
export default User;
