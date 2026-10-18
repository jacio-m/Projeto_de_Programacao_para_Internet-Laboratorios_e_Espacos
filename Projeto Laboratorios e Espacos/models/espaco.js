//aqui vamos criar o modelo de "espaço", ou seja, a entidade do banco de dados
module.exports = (sequelize, DataTypes) => {
//definimos como "Espaco" pq o sequelize transforma a tabela no plural (espacos)
  return sequelize.define(
    "Espaco",
    {
    //id é a chave primaria com autoincrement
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      //nome, localizacao, capacidade, recursos e situacoes sao as outras colunas de atributos
      nome: {
        type: DataTypes.STRING(120), //vira VARCHAR(120) no sql (texto com limite 120)
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [3, 120]
        }
      },
      localizacao: {
        type: DataTypes.STRING(120),
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      capacidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1
        }
      },
      recursos: {
        type: DataTypes.TEXT, //vira TEXT no sql (texto praticamente sem limite)
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      situacao: {
        type: DataTypes.STRING(40),
        allowNull: false,
        defaultValue: "Disponível",
        validate: {
          isIn: [["Disponível", "Em uso", "Em manutenção"]]
        }
      }
    },
    {
      tableName: "espacos",
      timestamps: true //atributo timestamps faz o sequelize criar a data de criação e a data de alteração dessa entidade
    }
  );
};