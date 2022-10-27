<template>
	<div id="app">

		<div id="header-container">
			<div id="logo-container">
				<img id="logo" src="../public/assets/images/icon-left-font-monochrome-black.png" alt="Logo de Groupomania">
			</div>
			<div id="nav">
				<router-link to="/">Déconnexion</router-link> 
			</div>
		</div>
		<router-view />
		
	</div>
</template>