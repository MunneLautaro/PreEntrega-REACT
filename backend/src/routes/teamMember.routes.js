import { Router } from "express"
import {
  createTeamMember,
  deleteTeamMember,
  getTeam,
  getTeamMemberById,
  updateTeamMember,
} from "../controllers/teamMember.controller.js"
import { validate } from "../middlewares/validate.js"
import { validateObjectId } from "../middlewares/validateObjectId.js"
import {
  createTeamMemberSchema,
  updateTeamMemberSchema,
} from "../validations/teamMember.validation.js"

const router = Router()

router.get("/", getTeam)
router.post("/", validate(createTeamMemberSchema), createTeamMember)

router.get("/:id", validateObjectId(), getTeamMemberById)
router.patch("/:id", validateObjectId(), validate(updateTeamMemberSchema), updateTeamMember)
router.put("/:id", validateObjectId(), validate(createTeamMemberSchema), updateTeamMember)
router.delete("/:id", validateObjectId(), deleteTeamMember)

export default router
