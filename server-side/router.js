import { Router } from "express";
import * as requestHandler from "./requestHandler.js";

const router = Router();

router.route("/addtodo").post(requestHandler.addTodo);
router.route("/gettodos").get(requestHandler.getTodos);
router.route("/deletetodo/:id").delete(requestHandler.deleteTodo);
router.route("/gettodobyid/:_id").get(requestHandler.getTodoById);
router.route("/updatetodo/:id").put(requestHandler.updateTodo);

export default router;