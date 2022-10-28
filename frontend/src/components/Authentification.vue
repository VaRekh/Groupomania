<template>
  <div id="global-container">

    <div id="infos-container">
      <h1 id="infos__welcome">Bienvenue !</h1>
      <p id="infos__text">
        Vous êtes sur la page de connexion vers le nouveau réseau social de Groupomania.<br>
        Ce site a pour but d'améliorer le cohésion et la communication entre chaque employé, cadre et responsable.
      </p>
      <p id="infos__account">
        Vous n'avez pas de compte ?
        <router-link to="/signup" id="router_click"><a>Cliquez-ici !</a></router-link>
      </p>
    </div>

    <div id="fields-container">
      <div class="field">
        <h2 id="field-title">Connectez-vous</h2>
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
          <font-awesome-icon icon="fa-solid fa-globe" class="main-button-icon"></font-awesome-icon>
          Connexion
        </button>
      </div>
    </div>

  </div>
</template>
 
<script>
import axios from "axios";
 
// Exportation d'Authentification contenant un champ "name", des datas et des méthodes spécifiques à la classe
export default
{
  name: "Authentification",
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
    // Vérification de l'existence d'une adresse mail dans le champs prévue à cet effet, puis vérification du mot de passe
    async validateEmailExistence()
    {
      let does_email_exist = this.email != "";
      if (does_email_exist)
      {
        this.validatePasswordExistence();
      }
      else
      {
        alert("Veuillez entrer une adresse e-mail.")
      }
    },
    // Vérification de l'existence d'un mot de passe
    async validatePasswordExistence()
    {
      let password_exist = this.password != "";
			if(password_exist) // Regex de vérification
			{
        this.authentification();
			}
			else
			{
        alert("Veuillez entrer un mot de passe");
			}
    },
    // Permet d'authentifier les informations entrées par l'utilisateur avec celles contenues dans la base de données
    // S'il n'y pas d'erreur un token est créé et stocké, permettant de gérer les droits de l'utilisateur
    async authentification()
    {
      try
      {
        var dataPost = { email    : this.email,
		                   password : this.password }

        await axios.post(this.base_url + "/auth/login",
                         { headers: { 'Content-Type': 'application/json' },
                           dataPost })
          .then(function (response)
          {
            localStorage.setItem("token", response.data.token);
            window.location.href = "/posts";
          })
          .catch(function (error)
          {
            alert("Adresse e-mail ou mot de passe incorrecte.s")
            console.log(error);
          }
        );
      }
      catch (err)
      {
        console.log(err);
      }
    }
  }
};
</script>