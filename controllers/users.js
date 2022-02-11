const cpfValidator = require("cpf-cnpj-validator")
const { check, validationResult } = require("express-validator")

/**
 * @function signup Cadastro de clientes
 */

exports.signup = (req, res, next) => {
  
  const validationErrors = validationResult(req)

  if (validationErrors.isEmpty()) {
    if (cpfValidator.cpf.isValid(req.body.cpf.toString())) {
      res.status(200).send({
        error: false,
        message: "CPF IS VALID",
      })
    } else {
      res.status(422).send({
        error: true,
        message: "Este CPF não é válido.",
        param: "cpf",
      })
    }
  } else {
    res.status(422).send({
      error: true,
      message: validationErrors.array()[0].msg,
      param: validationErrors.array()[0].param,
    })
  }

  next()
}

/**
 * @function signin Login de clientes
 */

exports.signin = (req, res, next) => {
  const validationErrors = validationResult(req)

  if (validationErrors.isEmpty()) {
  } else {
    res.status(422).send({
      error: true,
      message: validationErrors.array()[0].msg,
      param: validationErrors.array()[0].param,
    })
  }

  next()
}

/**
 * @function profile Atualiza dados de perfil de clientes
 */

exports.profile = (req, res, next) => {
  const validationErrors = validationResult(req)

  if (validationErrors.isEmpty()) {
  } else {
    res.status(422).send({
      error: true,
      message: validationErrors.array()[0].msg,
      param: validationErrors.array()[0].param,
    })
  }

  next()
}

/**
 * @function profilePic Altera a foto de perfil do usuário
 */

exports.profilePic = (req, res, next) => {
  res.status(200).send({
    error: false,
    message : "updating profile pic"
  })

  next()
}

/**
 * @function formValidation Validação de formulários
 */

exports.formValidation = (method) => {
  switch (method) {

    case "signup": // Regras de validação para cadastro
      return [
        check("name")
          .exists()
          .withMessage("O campo Nome é obrigatório.")
          .isString()
          .withMessage("O campo Nome deve ser do tipo texto.")
          .isLength({ min: 3 })
          .withMessage("O campo Nome deve ter pelo menos 3 caracteres."),
        check("email")
          .exists()
          .withMessage("O campo Email é obrigatório.")
          .isEmail()
          .withMessage("Este email não é válido."),
        check("cpf").exists().withMessage("O campo CPF é obrigatório."),
        check("password")
          .exists()
          .withMessage("O campo Senha é obrigatório.")
          .isLength({ min: 6 })
          .withMessage("O campo Senha deve ter pelo menos 6 caracteres."),
        check("match")
          .exists()
          .withMessage("O campo Confirmação de Senha é obrigatório.")
          .isLength({ min: 6 })
          .withMessage(
            "O campo Confirmação de Senha deve ter pelo menos 6 caracteres."
          )
          .custom((value, { req }) => {
            if (value !== req.body.password) {
              throw new Error("As senhas não coincidem.")
            } else {
              return true
            }
          }),
      ]
      break

    case "signin": // Regras de validação para login
      return [
        check("cpf")
          .exists()
          .withMessage("O campo CPF é obrigatório.")
          .isNumeric()
          .withMessage("O campo CPF precisa ser numérico.")
          .isLength({ min: 11 })
          .withMessage("O campo CPF deve ter pelo menos 11 caracteres."),
        check("password")
          .exists()
          .withMessage("O campo Senha é obrigatório.")
          .isLength({ min: 6 })
          .withMessage("O campo Senha deve ter pelo menos 6 caracteres."),
      ]
      break

    case "profile": // Regras de validação para atualizar o perfil
      return [
        check("name")
          .exists()
          .withMessage("O campo Nome é obrigatório.")
          .isString()
          .withMessage("O campo Nome deve ser do tipo texto.")
          .isLength({ min: 3 })
          .withMessage("O campo Nome deve ter pelo menos 3 caracteres."),
        check("email")
          .exists()
          .withMessage("O campo Email é obrigatório.")
          .isEmail()
          .withMessage("Este email não é válido."),
      ]
      break
  }
}
