import { Sport } from "../entities/Sport";
import { ISport } from "../interfaces/ISport"

export class SportController {

    public async create(req, res) {
        try {
            let sport: ISport = {
                code: req.body.code,
                name: req.body.name,
                description: req.body.description
            }

            // HACER EL SERVICIO DE VALIDACIONES GENERICO //
            // -- ACA METER LAS VALIDACIONES DE LOS CAMPOS -- //

            let newSport = await Sport.create(sport);

            return res.status(201).json(newSport);

        } catch (error) {

            return res.status(400).json(error);
        }
    }

    public async update (req,res) {
        try {
            
        } catch (error) {
            
        }
    }

    public async delete (req,res) {
        try {
            
        } catch (error) {
            
        }
    }

    public async find (req,res) {
        try {
            
        } catch (error) {
            
        }
    }

    public async findAll (req,res) {
        try {
            
        } catch (error) {
            
        }
    }

    public async findById (req,res) {
        try {
            
        } catch (error) {
            
        }
    }
    
    public async findOne (req,res) {
        try {
            
        } catch (error) {
            
        }
    }
}
