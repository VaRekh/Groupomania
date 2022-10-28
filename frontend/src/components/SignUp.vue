<template>
  <div id="global-container">

    <div id="infos-container">
      <h1 id="infos__welcome">Bienvenue !</h1>
      <p id="infos__text">
        Vous êtes sur la page de création de compte vers le nouveau réseau social de Groupomania.<br>
        Ce site a pour but d'améliorer le cohésion et la communication entre chaque employé, cadre et responsable.
      </p>
      <p id="infos__account">
        Vous avez déjà un compte ?
        <router-link to="/" id="router_click"><a>Cliquez-ici !</a></router-link>
      </p>
    </div>

    <div id="fields-container">
      <div class="field">
        <h2 id="field-title">Créez un compte</h2>
        <div class="control">
          <label for="email" class="label">Email</label>
          <input id="email" class="input form-control" type="text" placeholder="Email" v-model="email">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label for="password" class="label">Mot de passe</label>
          <input id="password" class="input form-control" type="text" placeholder="Mot de passe" v-model="password">
        </div>
      </div>
      <div class="button-container">
        <button class="button is-success main-button" @click="validateEmailExistence">
          <font-awesome-icon icon="fa-solid fa-pen" class="main-button-icon"></font-awesome-icon>
          Créer un compte
        </button>
      </div>
    </div>

  </div>
</template>
   
<script>
import axios from "axios";
 
// Exportation de CreateAccount contenant un champ "name", des datas et des méthodes spécifiques à la classe
export default
{
  name: "CreateAccount",
  data()
  {
    return {
    email         : "",
    password      : "",
    message       : "",
    };
  },
  methods:
  {
    // Cette série de méthodes vérifie étape par étape la validité des inputs rentrer par l'utilisateur avant de l'envoyer à la base de données

    // Vérification de l'existence d'une adresse mail dans le champs prévue à cet effet, puis vérification de sa forme
    async validateEmailExistence()
    {
      let does_email_exist = this.email != "";
      if (does_email_exist)
      {
        this.validateEmailForm();
      }
      else
      {
        alert("Veuillez entrer une adresse e-mail.")
      }
    },
    // Vérification du champs "Email" : doit être une suite de caractères alphanumériques (avec quelques caractères spéicaux acceptés),
		// suivi d'un arobase, suivi d'une chaîne de lettres, d'un point et d'une autre suite de lettres, le tout sans espace ; puis validation du mot de passe
    async validateEmailForm()
    {
      let is_email_valid = this.email.match(/(^[a-z._\-0-9]+@[a-z]+\.[a-z]+$)/i);
      if (is_email_valid)
      {
        this.validatePasswordExistence();
      }
      else 
      {
        alert("Veuillez entrer une adresse e-mail valide : les caractères alphanumériques ainsi que les symboles \"- _ .\" sont acceptés.");
      }
    },
    // Vérification de l'existence d'un mot de passe
    async validatePasswordExistence()
    {
      let password_exist = this.password != "";
			if(password_exist) // Regex de vérification
			{
        this.createAccount();
			}
			else
			{
        alert("Veuillez entrer un mot de passe");
			}
    },
    // Permet de récupérer et d'envoyer les informations entrées par l'utilisateur vers la base de données
    async createAccount()
    {
      try
      {
        var dataPost = { email    : this.email,
			                   password : this.password }

        await axios.post(this.base_url + "/auth/signup",
                       { headers: { 'Content-Type': 'application/json' },
                         dataPost })
        .then(function (response)
        {
          alert("Création du compte effectuée !");
          window.location.href = "/";
        })
        .catch(function (error)
        {
          console.log(error);
        });
      }
      catch (err)
      {
        console.log(err);
      }
    }
  }
};
</script>