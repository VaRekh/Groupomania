<template>
  <div id="edit-container">

    <div id="add-post-button" class="position">
      <router-link to="/posts">
        <div id="add-post-text">
          <button class="main-button">
            <font-awesome-icon icon="fa-solid fa-arrow-left" class="main-button-icon"/>
            Retour
          </button>
        </div>
      </router-link>
    </div>

    <div class="field text-field edit-post-field">
      <label class="label field-label">Description</label>
      <div class="control">
        <input class="input form-control" type="text" placeholder="Description" v-model="description"/>
      </div>
    </div>
 
    <div class="button-container">
      <button class="button is-success main-button" @click="updatePost">
        <font-awesome-icon icon="fa-solid fa-pen-to-square" class="main-button-icon" />
        Modifier
      </button>
    </div>

  </div>
</template>
 
<script>
import axios from "axios";
 
// Exportation d'EditPost contenant un champ "name", des datas et des méthodes spécifiques à la classe
export default
{
  name            : "EditPost",
  data()
  {
    return {
      description : "",
    };
  },

  // Permet de lancer la fonction getPostById à la fin du chargement de la page
  created: function ()
  {
    this.getPostById();
  },
  methods:
  {
    // Permet de récupérer la description du post en cours de modification, contenue dans la base de données, en utilisant son ID
    async getPostById()
    {
      try
      {
        const response   = await axios.get(`http://localhost:3000/api/posts/${this.$route.params.id}`,
                                         { headers: { 'Authorization': 'Bearer '
                                                      + localStorage.getItem("token") }});
        this.description = response.data.description;
      }
      catch (err)
      {
        console.log(err);
      }
    },
    // Permet de mettre à jour la description du post, d'envoyer la modification vers la base de données et de rediriger l'utilisateur vers /posts
    async updatePost()
    {
      try
      {
        var dataPost= { description       :  this.description };

		    await axios.put(`http://localhost:3000/api/posts/${this.$route.params.id}`,
                        dataPost,
                      { headers: { 'Authorization': 'Bearer '
                                   + localStorage.getItem("token") }});
        this.description = "";
        this.$router.push("/posts");
      } 
      catch (err)
      {
        console.log(err);
      }
    }
  }
};
</script>