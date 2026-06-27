const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
        street: String,
        city: String
    })

const userSchema = new mongoose.Schema(
    {
        name: String,
        age: {
            type: Number,
            min: 1,
            max: 100,
            validate: {
                validator: v => v % 2 === 0,
                message: props => `${props.value} is not an even number`
            },
        },
        email: {
            type: String,
            required: true,
            minLength: 10,
            lowercase: true,
            // uppercase: true,
        },

        // createdAt: {
        //     type: Date,
        //     immutable: true,
        //     // default: new Date(),
        //     default: () => Date.now(),
        // },
        // updatedAt: {
        //     type: Date,
        //     // default: new Date(),
        //     default: () => Date.now(),
        // },
        bestFriend: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User'
        },
        hobbies: [String],
        address: addressSchema,
    },
    {
        timestamps: true,
        // versionKey: false,
        strict: true,
    },
)

userSchema.methods.sayHi = function () {
    console.log(`Hi. My name is ${this.name}`)
}

// userSchema.statics.findByName = function (name) {
//     return this.where({
//         name: new RegExp(name, 'i')
//     })
// }

userSchema.statics.findByName = function (name) {
    return this.find({
        name: new RegExp(name, 'i')
    })
}

userSchema.query.byName = function (name) {
    return this.where({
        name: new RegExp(name, 'i')
    })
}

userSchema.virtual('namedEmail').get(function() {
    return `${this.name} <${this.email}>`
})

module.exports = mongoose.model("User", userSchema)