 <template>
  <div class="mt-15 pt-5 ma-5">
    <h2 class="my-5">User Profile</h2>
    <v-card align="center" outlined class="pb-5">
      <v-avatar size="150" contain color="grey" class="mt-n15">
        <img v-if="url" :src="url" />
        <img
          v-else-if="this.profilePicture"
          :src="getLink(this.profilePicture)"
        />
        <v-icon v-else size="150"> mdi-account </v-icon>
      </v-avatar>
      <input
        type="file"
        ref="file"
        style="display: none"
        @change="onFileChange"
      />
      <div>
        <v-btn
          text
          rounded
          dark
          color="green"
          class="text-capitalize"
          @click="$refs.file.click()"
          >Change profile photo</v-btn
        >
        <h4>{{ firstName }} {{ lastName }}</h4>
      </div>
      <!-- Image uploader -->
    </v-card>

    <v-toolbar flat>
      <template v-slot:extension>
        <v-tabs v-model="tabs" centered>
          <v-tab> Holdings </v-tab>
          <v-tab> Uploads </v-tab>
          <v-tab> Details </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tabs">
      <v-tab-item>
        <h2 class="my-5">Holdings</h2>
        <v-row>
          <v-col
            cols="12"
            lg="6"
            md="12"
            sm="12"
            v-for="(book, i) in holdings_"
            :key="i"
          >
            <v-card height="100%" class="d-flex flex-column" outlined>
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
              <v-spacer></v-spacer>
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
        <div
          v-if="holdings_.length <= 0"
          class="red--text py-5 font-weight-bold"
        >
          No holdings. See books<v-btn
            to="/books"
            rounded
            text
            class="blue--text"
            >Here</v-btn
          >
        </div>
      </v-tab-item>
      <v-tab-item>
        <h2 v-if="ownerBooks_.length > 0" class="my-5">Uploads</h2>
        <v-row class="my-5 mb-8">
          <v-col v-for="(book, i) in ownerBooks_" :key="i">
            <v-card outlined>
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
            <div v-if="ownerHoldsUsers_.length > 0">
              <h3 class="my-5">
                List of users with hold on this book. You can contact them via
                the email or phone number listed
              </h3>
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                  sm="12"
                  v-for="(user, j) in ownerHoldsUsers_"
                  :key="j"
                >
                  <v-card class="pa-5">
                    <span class="font-weight-bold"> Full name: </span
                    >{{ user.firstName }} {{ user.lastName }}
                    <div>
                      <span class="font-weight-bold"> Phone number: </span
                      >{{ user.phoneNumber }}
                    </div>
                    <div>
                      <span class="font-weight-bold">Email: </span
                      >{{ user.email }}
                    </div>
                  </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn
                    rounded
                    block
                    @click="markSold(book._id)"
                    :disabled="!book.availability"
                  >
                    Mark as sold
                  </v-btn>
                  <span v-if="!book.availability" class="red--text my-3">
                    Item is not available anymore
                  </span>
                </v-col>
              </v-row>
            </div>
            <div v-else>
              <h4 class="red--text my-3">No holds on this item yet</h4>
            </div>
          </v-col>
        </v-row>
        <div
          v-if="ownerBooks_.length <= 0"
          class="red--text py-5 font-weight-bold"
        >
          No uploads. Click
          <v-btn to="/addbooks" rounded text class="blue--text font-weight-bold"
            >Here</v-btn
          >
          to add some
        </div>
      </v-tab-item>
      <v-tab-item>
        <h2 class="my-5">Personal Details</h2>
        <v-row>
          <v-col class="font-weight-bold"> Friends: </v-col>
          <v-col v-if="friendship.friends > 0">
            {{ friendship.friends.length }}
            <v-btn @click="redirect()" text class="text-capitalize" color="blue"
              >See list</v-btn
            >
          </v-col>
          <v-col v-else> 0 </v-col>
        </v-row>
        <v-row>
          <v-col class="font-weight-bold"> Email: </v-col>
          <v-col>{{ email }}</v-col>
        </v-row>
        <v-row>
          <v-col class="font-weight-bold">Phone Number: </v-col>
          <v-col>{{ phoneNumber }}</v-col>
        </v-row>
        <v-row>
          <v-col class="font-weight-bold">Program of study:</v-col>
          <v-col>{{ major }}</v-col>
        </v-row>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Book from "../components/Book.vue";
import axios from "axios";
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
      profilePicture: "",
      profilePictureFile: "",
      holdings_: [],
      loaded: false,
      ownerHoldsUsers_: [],
      ownerBooks_: [],
      holdCount_: {},
      isModalVisible: false,
      url: null,
      friendship: [],
      errors: "",
      tabs: null,
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
      "markSold",
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
      this.profilePicture = this.current_user.profilePicture;
      this.getFriendship();
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
    async markSold_(bookId) {
      await this.markSold(bookId);
    },
    async onFileChange(e) {
      this.profilePictureFile = e.target.files[0];
      this.url = URL.createObjectURL(this.profilePictureFile);
      const formData = new FormData();
      formData.append("_id", this.user_id);
      formData.append("profilePicture", this.profilePictureFile);
      const headers = { "Content-Type": "multipart/form-data" };

      await axios
        .post("http://localhost:3000/users/uploadProfile", formData, {
          headers,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          this.errors = err.response.data.error;
        });
    },
    getLink(link) {
      if (!link) {
        return "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
      }
      let currLink = "http://localhost:3000/" + link;
      return currLink;
    },
    //Get Friendship
    async getFriendship() {
      await axios
        .get(`http://localhost:3000/friendship/${this.user_id}`)
        .then((res) => {
          this.friendship = res.data;
        })
        .catch((err) => console.log(err));
    },
    redirect() {
      this.$router.push("/friends");
    },
  },
};
</script>
<style>
#preview img {
  max-width: 100%;
  max-height: 500px;
}
.add-hover {
  cursor: pointer;
}
</style>