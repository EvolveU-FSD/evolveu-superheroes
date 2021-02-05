const mongoose = require('../models/dbAccess')
const Superhero = require('../models/Superhero')

afterAll(() => {
    return mongoose.connection.close()
})

describe('Superhero', () => {
    describe('find', () => {
        it.skip('should find no records if none are inserted', () => {
            fail('unimplemented')
        })
        it.skip('should find all inserted records', () => {
            fail('unimplemented')
        })
    })
    describe('findById', () => {
        it('should find a record we have created', () => {
            // setup
            let createdSuperheroId 
            const setup = Superhero.create({name: 'super1'})
                .then((createdSuperhero) => {
                    createdSuperheroId = createdSuperhero._id
                })

            // execute
            const execute = setup.then(() => {
                return Superhero.findById(createdSuperheroId)
            })

            // assert
            execute.then((findResult) => {
                expect(findResult.name).toBe('super1')
            })
        })
    })
    describe('create', () => {
        it('should not create a record without a name', () => {
            // execute
            return Superhero.create({nickname: 'Lizzie'})
                .then((createdRecord) => {
                    fail('Superhero should not be created!')
                })
                .catch((error) => {
                    expect(error.name).toBe('ValidationError')
                    expect(error.message).toBe('Superhero validation failed: name: Path `name` is required.')
                })
        })
        it('should create a record with a name', () => {
            // execute
            return Superhero.create({name: 'Dr. Ok'})
                .then((createdRecord) => {
                    // assert
                    expect(createdRecord.name).toBe('Dr. Ok')
                })
        })
    })
})