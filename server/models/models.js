const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Users = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    number: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, allowNull: false, defaultValue: "USER"}
})

const Tasks = sequelize.define('tasks', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    desc: {type: DataTypes.STRING},
    deadline: {type: DataTypes.DATE, allowNull: false},
    projectId: { type: DataTypes.INTEGER, allowNull: true }
})

const Categories = sequelize.define('categories', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Statuses = sequelize.define('statuses', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Priorities = sequelize.define('priorities', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Plans = sequelize.define('plans', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    completed: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
})

const Targets = sequelize.define('targets', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    completed: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
})

const Projects = sequelize.define('projects', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false}
})



Users.hasMany(Tasks)
Tasks.belongsTo(Users)

Users.hasMany(Projects)
Projects.belongsTo(Users)

Users.hasMany(Plans)
Plans.belongsTo(Users)

Users.hasMany(Targets)
Targets.belongsTo(Users)

Projects.hasMany(Tasks)
Tasks.belongsTo(Projects)

Categories.hasMany(Tasks)
Tasks.belongsTo(Categories)

Statuses.hasMany(Tasks)
Tasks.belongsTo(Statuses)

Priorities.hasMany(Tasks)
Tasks.belongsTo(Priorities)


module.exports = {
    Users,
    Tasks,
    Categories,
    Statuses,
    Priorities,
    Plans,
    Targets,
    Projects
}