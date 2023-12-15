<template>
  <v-container class="d-flex justify-center">
    <v-sheet
    :elevation=12
    border
    rounded
    class="pa-2 pa-md-4">

    <!-- Profile picture container -->
      <v-container class="d-flex-row">
        <v-row class="justify-center">
          <v-avatar>
            <v-icon size="60" icon="mdi-account-circle"></v-icon>
          </v-avatar>
        </v-row>
        <v-row class="justify-center">
           <v-btn class="ma-2">Upload</v-btn>
        </v-row>
      </v-container>
      <!-- User details container -->
      <v-container class="mt-4 flex flex-md-row justify-center justify-md-center items-center">
       <v-row>
        <v-col cols="12" md="5">
          <label htmlFor="name">User Name:</label>
        </v-col>
        <v-col cols="12" md="5">
          <input id="name" type="text" placeholder="Test user"/>
        </v-col>
       </v-row>
      <v-row>
         <v-col cols="12" md="5">
          <label htmlFor="email">Email:</label>
        </v-col>
        <v-col cols="5" md="4">
          <input class="" id="email" type="email" placeholder="test@gmail.com"/>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="5" md="2">
          <v-icon class="text-success" icon="mdi-check"></v-icon>
        </v-col>
       </v-row>
       <v-row>
        <v-col cols="12" md="5">
          <label htmlFor="phoneNo">Phone No:</label>
        </v-col>
        <v-col cols="5" md="4">
          <input id="phoneNo" type="text" placeholder="0700632189"/>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="5" md="2">
          <v-icon class="text-success" icon="mdi-check"></v-icon>
        </v-col>
       </v-row>
       <v-row class="justify-center mt-4">
        <v-btn>Update</v-btn>
       </v-row>
      </v-container>
      <!-- User account balance -->
      <v-container class="bg-blue rounded mt-2 pa-4">
        <v-row class="justify-center">
          <v-col cols="5" md="3" class="text-caption text-md-body-2">Account Balance:</v-col>
          <v-col cols="7" md="5" class="text-caption text-md-body-2">Kshs.1,000,000</v-col>
          <v-btn cols="12" md="3" class="my-2">Deposit</v-btn>
        </v-row>
      </v-container>
    </v-sheet>
  </v-container>

</template>
<script setup>

</script>
