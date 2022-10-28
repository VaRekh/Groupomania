<template>
  <div id="posts-container">

    <div id="top-bar">
      <div id="top-bar-text">
        <h1>Messages postés</h1>
      </div>
      <div id="top-bar-button">
        <router-link :to="{ name: 'PostCreate' }" class="button is-success mt-5">
          <div id="add-post-text">
            <button class="main-button">
              <font-awesome-icon icon="fa-solid fa-plus" class="main-button-icon"></font-awesome-icon>
              Nouveau message
            </button>
          </div>
        </router-link>
      </div>
    </div>

    <div id="cards-container">
      <div class="card" v-for="item in items" :key="item.id">
        <div class="card-text">
          <p>{{ item.description }}</p>
        </div>
        <div class="card-image">
          <img class="images" :src="item.postImage" alt="Image postée par un internaute">
        </div>
        <div class="card-options">
          <div class="card-likes">
            <div class="vote-icon" @click="addLike(item._id)">
              <font-awesome-icon icon="fa-solid fa-thumbs-up" class="like"></font-awesome-icon>
              <span class="vote-number number-like"> + {{item.usersLiked.length}}</span>
            </div>
            <div class="vote-icon" @click="addDislike(item._id)">
              <font-awesome-icon icon="fa-solid fa-thumbs-down" class="dislike"></font-awesome-icon>
              <span class="vote-number number-dislike"> - {{item.usersDisliked.length}}</span>
            </div>
          </div>
          <div class="card-control" v-if="userId == '6356d9bd57848d3bcb47fa9e' || userId== item.userId">
            <router-link :to="{ name: 'PostEdit', params: { id: item._id } }" class="button is-info is-small">
              <font-awesome-icon icon="fa-solid fa-pen-to-square" class="control-icon"></font-awesome-icon>
            </router-link>
            <a class="button is-danger is-small" @click="deletePost(item._id)">
              <font-awesome-icon icon="fa-solid fa-trash" class="control-icon"></font-awesome-icon>
            </a>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
 
<script>
import axios from "axios";
 
// Exportation d'PostList contenant un champ "name", des datas et des méthodes spécifiques à la classe
export default
{
  name: "PostList",
  data()
  {
    return {
    items: [],
    userId: "",
    };
  },
  // Permet de lancer les fonctions getAllPosts et getUser à la fin du chargement de la page
  created() {
    this.getAllPosts();
    this.getUser();
  },
 
  methods:
  {
    // Permet de récuper l'userId de l'utilisateur en passant par la base de données
    async getUser()
    {
      try
      {
        const response = await axios.get(this.base_url + "/posts/user",
                                        { headers: { 'Authorization': 'Bearer '
                                                      + localStorage.getItem("token") }});
        this.userId    = response.data.userId;
      }
      catch (err)
      {
        console.log(err);
      }
    },
    // Permet de récupérer tous les posts de la base de données
    async getAllPosts()
    {
      try
      {
        const response = await axios.get(this.base_url + "/posts/all",
                                        { headers: { 'Authorization': 'Bearer '
                                                      + localStorage.getItem("token") }});
        this.items     = response.data;
      }
      catch (err)
      {
        console.log(err);
      }
    },
    // Permet de supprimer tous les posts de la base de données et de rafraîchir la liste de tous les posts
    async deletePost(id)
    {
      try
      {
        await axios.delete(this.base_url + `/posts/${id}`,
                          { headers: { 'Authorization': 'Bearer '
                                       + localStorage.getItem("token") }});
        this.getAllPosts();
      }
      catch (err)
      {
        console.log(err);
      }
    },
    // Permet d'envoyer l'information du like à l'API et de rafraîchir la liste de tous les posts
    async addLike(id)
    {
      try
      {
        var dataPost = { id   :  id,
                         like :  1  };

        await axios.post(this.base_url + "/posts/like",
                         dataPost,
                       { headers: { 'Authorization': 'Bearer '
                                    + localStorage.getItem("token") }});
        this.getAllPosts();
      }
      catch (err)
      {
        console.log(err);
      }
    },
    // Permet d'envoyer l'information du dislike à l'API et de rafraîchir la liste de tous les posts
    async addDislike(id)
    {
      try
      {
        var dataPost = { id   :  id,
                         like :  -1 };
        await axios.post(this.base_url + "/posts/like",
                         dataPost,
                       { headers: { 'Authorization': 'Bearer '
                                    + localStorage.getItem("token") }});
        this.getAllPosts();
      }
      catch (err)
      {
        console.log(err);
      }
    }
  }
};
</script>