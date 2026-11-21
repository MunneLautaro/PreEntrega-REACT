import * as teamMemberService from "../services/teamMember.service.js"

export const getTeam = async (_req, res) => {
  const team = await teamMemberService.getAll()
  res.json({ ok: true, data: team })
}

export const getTeamMemberById = async (req, res) => {
  const member = await teamMemberService.getById(req.params.id)
  res.json({ ok: true, data: member })
}

export const createTeamMember = async (req, res) => {
  const member = await teamMemberService.create(req.body)
  res.status(201).json({ ok: true, data: member })
}

export const updateTeamMember = async (req, res) => {
  const member = await teamMemberService.update(req.params.id, req.body)
  res.json({ ok: true, data: member })
}

export const deleteTeamMember = async (req, res) => {
  await teamMemberService.remove(req.params.id)
  res.status(204).end()
}
