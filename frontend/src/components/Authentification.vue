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
        <button class="button is-success main-button" @click="authentification">
          <font-awesome-icon icon="fa-solid fa-globe" class="main-button-icon"/>
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
    // Permet d'authentifier les informations entrées par l'utilisateur avec celles contenues dans la base de données
    // S'il n'y pas d'erreur un token est créé et stocké, permettant de gérer les droits de l'utilisateur
    async authentification()
    {
      try
      {
		    var dataPost = { email    : this.email,
		    	               password : this.password }

        await axios.post("http://localhost:3000/api/auth/login",
                         { headers: { 'Content-Type': 'application/json' },
                           dataPost })
          .then(function (response)
          {
            localStorage.setItem("token", response.data.token);
            window.location.href = "/posts";
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