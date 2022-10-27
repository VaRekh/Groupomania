<template>
  <div id="add-post-container">

    <div id="top-bar">
      <div id="top-bar-text">
        <h1>Nouveau message</h1>
      </div>
      <div id="top-bar-button" class="position">
        <router-link to="/posts">
          <div id="add-post-text">
            <button class="main-button">
              <font-awesome-icon icon="fa-solid fa-arrow-left" class="main-button-icon"></font-awesome-icon>
              Retour
            </button>
          </div>
        </router-link>
      </div>
    </div>

    <div id="fields">
      <div class="field text-field">
        <label class="label field-label">Message</label>
        <div class="control">
          <input class="input form-control" type="text" placeholder="Écrivez votre message ici..." v-model="description">
        </div>
      </div>
      <div class="field image-field">
        <label class="label field-label">Image</label>
        <div class="image-button">
          <input id="image-input" type="file" ref="file" @change="previewFiles" hidden>
          <label for="image-input" id="image-input">Choisir une image</label>
          <span id="chosen-image">Aucun fichier choisi</span>
        </div>
      </div>
    </div>

    <div class="button-container">
      <button class="button is-success main-button" @click="savePost">
        <font-awesome-icon icon="fa-solid fa-plus" class="main-button-icon"></font-awesome-icon>
        Poster
      </button>
    </div>

  </div>
</template>
 
<script>
import axios from "axios";

// Exportation d'AddPost contenant un champ "name", des datas et des méthodes spécifiques à la classe
export default
{
  name            : "AddPost",
  data()
  {
    return {
      description : "",
      postImage   : "",
	    file		    : {},
      message     : "",
    };
  },
  methods:
  {
    // Permet de récupérer l'image insérée dans l'input adéquat pour afficher le nom de cette image côté HTML
	  previewFiles()
    {
	    this.file                = document.querySelector('input[type=file]')['files'][0];
      const chosen_image       = document.getElementById("chosen-image");
      chosen_image.textContent = this.file.name;
    },
    // Permet de sauvegarder le post en récupérant les infos de l'image et en les transformant en URL pour la rendre lisible, ainsi qu'en récupérant la description indiquée
    async savePost()
    {
      try
      {
        let base64String		=	"";
        var vm 				      = this;
        var reader 			    = new FileReader();
        reader.onload 		  = function ()
        {
          base64String 		  = reader.result.replace("data:", "").replace(/^.+,/, "");	  
          base64String 		  = "data:image/png;base64,"+base64String ;	  
          var dataPost		  =
          {
            description     : vm.description,
            postImage       : base64String
          }
          vm.postData(dataPost);
	      }
	      reader.readAsDataURL(this.file);
      }
      catch (err)
      {
        console.log(err);
      }
    },
    // Permet d'envoyer le post et son contenu vers la base de données, avec le header adéquat pour gérer les autorisations de l'utilisateur, et enfin de renvoyer vers la page /posts
	  async postData(params)
    {
      await axios.post("http://localhost:3000/api/posts",
                       params,
                     { headers: { 'Authorization': 'Bearer '
                                 + localStorage.getItem("token") }});
      this.$router.push("/posts");
    },
  },
};
</script>