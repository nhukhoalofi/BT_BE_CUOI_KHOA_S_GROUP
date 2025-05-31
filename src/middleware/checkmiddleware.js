import jwt from "jsonwebtoken"

const checkrole=(role)=>{
    return (req, res, next)=>{
        try {
            const authHeader=req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer")){
                return res.status(401).json({ message: "No token provide"})
            }
            const token = authHeader.split(" ")[1];
            const decoded =jwt.verify(token, JWT_SECRET);

            if(!role.includes(decoded.role)){
                return res.status(403).json({ message: "Forbidden: Không có quyền truy cập"});
            }
            req.user=decoded;
            next();
        }
        catch(err){
            return res.status(401).json({message:"Unauthorized:Token không hợp lệ"})
        }
    }    
}
export default checkrole;