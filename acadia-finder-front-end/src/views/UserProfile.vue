 <template>
  <div>
    <v-card align="center" flat>
      <v-icon size="150"> mdi-account </v-icon>
      <h4>{{ firstName }} {{ lastName }}</h4>
      <div class="mt-5">
        <h3 class="mb-2">Personal Details</h3>
        <div><span class="font-weight-bold"> Email: </span>{{ email }}</div>
        <div>
          <span class="font-weight-bold">Phone Number: </span>{{ phoneNumber }}
        </div>
        <div>
          <span class="font-weight-bold">Program of study:</span> {{ major }}
        </div>
      </div>
    </v-card>
    <v-card>
      
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      phoneNumber: "",
      major: "",
      user_id: "",
    };
  },

  computed: {
    ...mapState(["current_user"]),
  },

  created() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
    this.getUser_();
  },
  methods: {
    ...mapActions(["getUser"]),
    async getUser_() {
      await this.getUser();
      this.firstName = this.current_user.firstName;
      this.lastName = this.current_user.lastName;
      this.userName = this.current_user.userName;
      this.email = this.current_user.email;
      this.phoneNumber = this.current_user.phoneNumber;
      this.major = this.current_user.major;
      this.user_id = this.current_user._id;
    },
  },
};
</script>