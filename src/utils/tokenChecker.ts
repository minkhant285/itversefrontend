import jwt_decode from "jwt-decode";

export function TokenChecker(token: string): boolean {

    let userData: any = jwt_decode(
        token || ""
    );
    if (userData.role === "admin" || userData !== undefined) {
        if (new Date(userData.exp * 1000) < new Date()) {
            console.log(new Date(userData.exp * 1000).toLocaleString());
            console.log('invalid Token');
            return false;
        } else {
            console.log("Granted")
            return true;
        }
    } else {
        console.log("Admin permission required");
        return false;
    }
}
