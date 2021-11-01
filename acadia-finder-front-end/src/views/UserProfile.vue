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
    <div class="ma-5">
      <h3>Items uploaded and people who have holds on them</h3>
      <v-row>
        <v-col v-for="(book, i) in ownerBooks_" :key="i">
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
          </v-card>
          <div class="mt-5" v-if="book._id === holdCount_.bookId">
            <span class="font-weight-bold"> Number of holds: </span>
            <span class="green--text font-weight-bold">{{
              holdCount_.count
            }}</span>
          </div>
          <h3 v-if="ownerHoldsUsers_.length > 0" class="my-5">
            Here is the list of users who have hold on this item. You can
            contact them via the email or phone number listed
          </h3>
          <v-row>
            <v-col v-for="(user, j) in ownerHoldsUsers_" :key="j">
              <span class="font-weight-bold"> Full name: </span>{{ user.firstName }} {{ user.lastName }}
              <div>
                <span class="font-weight-bold"> Phone number: </span>{{ user.phoneNumber }}
              </div>
              <div>
                <span class="font-weight-bold">Email: </span>{{ user.email }}
              </div>
            </v-col>
          </v-row>
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
      ownerHoldsUsers_: [],
      ownerBooks_: [],
      holdCount_: {},
    };
  },

  computed: {
    ...mapState([
      "current_user",
      "holdings",
      "ownerHoldsUsers",
      "holdCount",
      "ownerBooks",
    ]),
  },

  created() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
    this.getUser_();
    this.getHoldings_();
    this.getHoldsAndUsers_();
  },
  mounted() {},
  methods: {
    ...mapActions([
      "getUser",
      "removeHold",
      "getHoldings",
      "getHoldsAndUsers",
      "getBooks",
    ]),
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
      await this.getUser_();
      await this.getHoldings(this.current_user._id);
      this.holdings_ = this.holdings;
    },
    async removeHold_(bookId) {
      await this.removeHold(bookId);
    },
    async getHoldsAndUsers_() {
      await this.getUser_();
      await this.getBooks();
      await this.getHoldsAndUsers(this.current_user._id);
      this.ownerHoldsUsers_ = this.ownerHoldsUsers;
      this.ownerBooks_ = this.ownerBooks;
      this.holdCount_ = this.holdCount;
    },
  },
};
</script>