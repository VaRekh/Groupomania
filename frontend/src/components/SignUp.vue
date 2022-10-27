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
        <label class="label">Email</label>
        <div class="control">
          <input class="input form-control" type="text" placeholder="Email" v-model="email"/>
        </div>
      </div>
      <div class="field">
        <label class="label">Mot de passe</label>
        <div class="control">
          <input class="input form-control" type="text" placeholder="Mot de passe" v-model="password"/>
        </div>
      </div>
      <div class="button-container">
        <button class="button is-success main-button" @click="createAccount">
          <font-awesome-icon icon="fa-solid fa-pen" class="main-button-icon"/>
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
    // Permet de récupérer et d'envoyer les informations entrées par l'utilisateur vers la base de données
    async createAccount()
    {
      try
      {
	      var dataPost = { email    : this.email,
			                   password : this.password }

        await axios.post("http://localhost:3000/api/auth/signup",
                         { headers: { 'Content-Type': 'application/json' },
                           dataPost })
          .then(function (response)
          {
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