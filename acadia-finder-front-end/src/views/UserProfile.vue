 <template>
  <div>
    <v-card align="center" flat>
      <v-card-title> User Profile </v-card-title>
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
    <div class="ma-5">
      <h3 class="my-5">Holdings</h3>
      <v-row>
        <v-col
          cols="12"
          lg="6"
          md="12"
          sm="12"
          v-for="(book, i) in holdings_"
          :key="i"
        >
          <v-card>
            <Book
              :name="book.name"
              :author="book.author"
              :buyPrice="book.buyPrice"
              :edition="book.edition"
              :bookImage="book.bookImage"
              :courseId="book.courseId"
              :forRent="book.forRent"
              :forSale="book.forSale"
              :rentPrice="book.rentPrice"
            />
            <v-card-actions>
              <v-btn
                :disabled="!book.availability"
                outlined
                rounded
                text
                @click="removeHold_(book._id)"
              >
                Remove Hold
              </v-btn>
              <span class="ml-2 red--text" v-if="!book.availability">
                Item has been sold
              </span>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Book from "../components/Book.vue";
// import axios from "axios";
export default {
  components: {
    Book,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      phoneNumber: "",
      major: "",
      user_id: "",
      holdings_: [],
      loaded: false,
    };
  },

  computed: {
    ...mapState(["current_user", "holdings"]),
  },

  created() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
    this.getUser_();
    this.getHoldings_();
    
  },
  mounted() {},
  methods: {
    ...mapActions(["getUser", "removeHold", "getHoldings"]),
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
    async getHoldings_() {
      await this.getUser_()
      await this.getHoldings(this.current_user._id);
      this.holdings_ = this.holdings;
    },
    async removeHold_(bookId) {
      await this.removeHold(bookId);
    },
  },
};
</script>