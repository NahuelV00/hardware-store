"use strict";
//USER MODEL
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomErrorImpl = void 0;
class CustomErrorImpl extends Error {
    constructor(statusCode, message) {
        super(message); // Llamamos al constructor de Error
        this.statusCode = statusCode;
        this.message = message;
        // Esto asegura que la instancia personalizada se mantenga al lanzar el error
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = this.constructor.name; // Nombre de la clase
    }
}
exports.CustomErrorImpl = CustomErrorImpl;
