export interface IStadium {
    name: String,
    description?: String,
    address?: {
        Line1: String,
        Line2: String,
        city: String,
        zipcode: String,
        state: String       
    },
    location?: {
        type: String,
        coordinate: Number[]
    }
}
