import { SportController } from "../controllers/SportController";
import { AuthorizationService } from "../service/authServices";

const _authServices: AuthorizationService = new AuthorizationService();

export class SportRoutes {

    private _sportController: SportController = new SportController();

    public registerRoutes(app): void {

        app.route('/v1/sports')
            .post(_authServices.verifyToken, this._sportController.create)
            // .get(_authServices.verifyToken, this._sportController.getAll)

        // app.route('/v1/sports/:sportId')
            // .put(_authServices.verifyToken, this._sportController.update)
            // .get(_authServices.verifyToken, this._sportController.getOne)
            // .delete(_authServices.verifyToken, this._sportController.delete)
    }
}