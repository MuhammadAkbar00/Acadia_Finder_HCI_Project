 <template>
  <div class="mt-15 pt-5 ma-5">
    <h2 class="my-5">User Profile</h2>
    <v-card align="center" outlined class="pb-5 border-bottom">
      <div class="mt-n3">
        <v-avatar size="150" contain color="grey" class="mt-n15">
          <img v-if="url" :src="url" />
          <img
            v-else-if="this.profilePicture"
            :src="getLink(this.profilePicture)"
          />
          <v-icon v-else size="150"> mdi-account </v-icon>
        </v-avatar>
      </div>
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
          color="rgb(6 67 121)"
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

    <v-card outlined class="pa-5 border-top">
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
              <v-card height="100%" class="d-flex flex-column pa-2" outlined>
                <Book
                  :name="book.book.name"
                  :author="book.book.author"
                  :buyPrice="book.book.buyPrice"
                  :edition="book.book.edition"
                  :bookImage="book.book.bookImage"
                  :courseId="book.book.courseId"
                  :forRent="book.book.forRent"
                  :forSale="book.book.forSale"
                  :rentPrice="book.book.rentPrice"
                />
                <v-spacer></v-spacer>
                <v-card-actions>
                  <v-btn
                    :disabled="!book.book.availability"
                    class="white--text"
                    rounded
                    small
                    color="red darken-3"
                    @click="removeHold_(book.book._id)"
                  >
                    Remove Hold
                  </v-btn>
                  <span class="ml-2 red--text" v-if="!book.book.availability">
                    Item has been sold
                  </span>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <div
            v-if="holdings_.length <= 0"
            class="red--text text--darken-3 py-5 font-weight-bold"
          >
            No holdings. See books<v-btn
              to="/books"
              rounded
              text
              color="rgb(6 67 121)"
              >Here</v-btn
            >
          </div>
        </v-tab-item>
        <v-tab-item>
          <h2 v-if="ownerBooks_.length > 0" class="my-5">Uploads</h2>
          <v-row class="my-5 mb-8">
            <v-col
              cols="12"
              lg="6"
              md="6"
              sm="12"
              v-for="(book, i) in ownerBooks_"
              :key="i"
            >
              <v-card outlined height="100%" class="pa-5 d-flex flex-column pa-3">
                <Book
                  :name="book.book.name"
                  :author="book.book.author"
                  :buyPrice="book.book.buyPrice"
                  :edition="book.book.edition"
                  :bookImage="book.book.bookImage"
                  :courseId="book.book.courseId"
                  :forRent="book.book.forRent"
                  :forSale="book.book.forSale"
                  :rentPrice="book.book.rentPrice"
                />
                <div class="mt-5" v-if="book.count > 0">
                  <span class="font-weight-bold"> Number of holds: </span>
                  <span class="green--text font-weight-bold">
                    {{ book.count }}
                  </span>
                </div>
                <div v-if="book.users.length > 0">
                  <h3 class="my-5">
                    List of users with hold on this book. You can contact them
                    via the email/phone number listed
                  </h3>
                  <v-row>
                    <v-col
                      cols="12"
                      lg="12"
                      md="6"
                      sm="12"
                      v-for="(user, j) in book.users"
                      :key="j"
                    >
                      <v-card class="pa-5">
                        <v-row class="font-weight-bold">
                          <v-col> Full name: </v-col>
                          <v-col>
                            {{ user.firstName }} {{ user.lastName }}</v-col
                          >
                        </v-row>
                        <v-row class="font-weight-bold">
                          <v-col> Phone Number: </v-col>
                          <v-col> {{ user.phoneNumber }}</v-col>
                        </v-row>
                        <v-row class="font-weight-bold">
                          <v-col> Email: </v-col>
                          <v-col> {{ user.email }}</v-col>
                        </v-row>
                      </v-card>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-btn
                        rounded
                        block
                        small
                        class="white--text mt-3"
                        color="rgb(6 67 121)"
                        @click="markSold(book.book._id)"
                        :disabled="!book.book.availability"
                      >
                        Mark as sold
                      </v-btn>
                      <span
                        v-if="!book.book.availability"
                        class="red--text my-3"
                      >
                        Item is not available anymore
                      </span>
                    </v-col>
                  </v-row>
                </div>
                <div v-else>
                  <h4 class="red--text text--darken-3 mb-10">
                    No holds on this item yet
                  </h4>
                </div>
              </v-card>
            </v-col>
          </v-row>
          <div
            v-if="ownerBooks_.length <= 0"
            class="red--text text--darken-3 py-5 font-weight-bold"
          >
            No uploads. Click
            <v-btn to="/addbooks" rounded text color="rgb(6 67 121)"
              >Here</v-btn
            >
            to add some
          </div>
        </v-tab-item>
        <v-tab-item>
          <h2 class="my-5">Personal Details</h2>
          <v-row>
            <v-col class="font-weight-bold"> Friends: </v-col>
            <v-col v-if="loadFriends && friendship.friends.length > 0">
              {{ friendship.friends.length }}
              <v-btn
                @click="redirect()"
                text
                class="text-capitalize"
                color="rgb(6 67 121)"
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
    </v-card>
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
      ownerBooks_: [],
      isModalVisible: false,
      url: null,
      friendship: [],
      errors: "",
      tabs: null,
      loadFriends: false,
    };
  },

  computed: {
    ...mapState(["current_user", "holdings", "ownerBooks"]),
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
      this.ownerBooks_ = this.ownerBooks;
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
        .then(() => {})
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
          this.loadFriends = true;
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
.border-top {
  border-top: none !important;
}
.border-bottom {
  border-bottom: none !important;
}
</style>