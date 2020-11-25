<template>
    <div>
        <div class="card m-2">
            <div class="card-body">
                Filter:
                <div class="row">
                    <div class="col-md-6">
                        <!-- departments -->
                        <div class="custom-row mb-2">
                            <label class="width-150">Departments</label>
                            <div class="width-200">
                                <AppSelect2 :options="filterLists.departments" :keys="['id', 'name']"
                                            @optionSelected="opt => {filter.department = opt; filter.page = 1}"></AppSelect2>
                            </div>
                        </div>

                        <!--positions-->
                        <div class="custom-row mb-2">
                            <label class="width-150">Positions</label>
                            <div class="width-200">
                                <AppSelect2 :options="filterLists.positions" :keys="['id', 'name']"
                                            @optionSelected="opt => {filter.position = opt; filter.page = 1}"></AppSelect2>
                            </div>
                        </div>

                        <!--brands-->
                        <div class="custom-row mb-2">
                            <label class="width-150">Brands</label>
                            <div class="width-200">
                                <AppSelect2 :options="filterLists.brands" :keys="['id', 'name']"
                                            @optionSelected="opt => {filter.brand = opt; filter.page = 1}"></AppSelect2>
                            </div>
                        </div>

                        <!--countries-->
                        <div class="custom-row mb-2">
                            <label class="width-150">Countries</label>
                            <div class="width-200">
                                <AppSelect2 :options="filterLists.countries" :keys="['id', 'name']"
                                            @optionSelected="opt => {filter.country = opt; filter.page = 1}"></AppSelect2>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6">

                        <!--nationality-->
                        <div class="custom-row mb-2">
                            <label class="width-150">Nationality</label>
                            <div class="width-200">
                                <AppSelect2 :options="filterLists.countries" :keys="['id', 'name']"
                                            @optionSelected="opt => {filter.nationality = opt; filter.page = 1}"></AppSelect2>
                            </div>
                        </div>

                        <!--status-->
                        <div class="custom-row mb-2">
                            <label class="width-150">Status</label>
                            <div class="width-200">
                                <AppSelect2 :options="filterLists.status" :keys="['id', 'name']"
                                            @optionSelected="opt => {filter.active = opt; filter.page = 1}"></AppSelect2>
                            </div>
                        </div>

                        <!--role-->
                        <div class="custom-row mb-2">
                            <label class="width-150">Role</label>
                            <div class="width-200">
                                <AppSelect2 :options="filterLists.roles" :keys="['id', 'name']"
                                            @optionSelected="opt => {filter.role = opt; filter.page = 1}"></AppSelect2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--table to show all users-->
        <div class="card m-2">
            <div class="card-body">
                <div class="text-right">
                    <button class="btn btn-primary mb-2"
                            data-toggle="modal"
                            data-target="#userForm"
                            @click="userInAction = true">Add User
                    </button>
                </div>
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead>
                        <tr class="bg-info text-white">
                            <td>Name</td>
                            <td>Phone</td>
                            <td>Department</td>
                            <td>Position</td>
                            <td>Brand</td>
                            <td>Country</td>
                            <td>Nationality</td>
                            <td>Status</td>
                            <td>Edit</td>
                        </tr>
                        </thead>
                        <tbody>
                        <template v-if="users.data && users.data.length > 0">
                            <tr v-for="user in users.data" :key="user.id">
                                <td>{{user.name}}</td>
                                <td>{{user.phone}}</td>
                                <td>{{user.department}}</td>
                                <td>{{user.position}}</td>
                                <td>{{user.brand_name}}</td>
                                <td>{{user.country}}</td>
                                <td>{{user.nationality}}</td>
                                <td>{{user.active}}</td>
                                <td>
                                    <a href="javascript:void(0)"
                                       data-toggle="modal"
                                       data-target="#userForm"
                                       @click.prevent="EditUser(user)">
                                        Edit
                                    </a>
                                </td>
                            </tr>
                        </template>
                        <tr v-else class="text-center">
                            <td colspan="7">There are no users to show</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <p>Page {{currentPage}} of {{lastPage}}</p>
                    <div class="width-150">
                        <select class="pagination-options" style="width: 100%">
                            <option value=""></option>
                            <option v-for="option in lastPage" :key="option"
                                    :selected="option == currentPage">{{option}}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <!--add edit form-->
        <div class="modal fade" id="userForm" tabindex="-1" role="dialog" aria-labelledby="userFormLabel"
             aria-hidden="true">
            <div class="modal-dialog" role="document">
                <AddEditUser v-if="userInAction" :filterLists="filterLists"
                             :userToEdit="userToEdit"
                             @userSaved="userSaved"></AddEditUser>
            </div>
        </div>
    </div>
</template>

<script>
    import users from "../api/users";
    import AppSelect2 from "../components/AppSelect2";
    import $ from "jquery";
    import AddEditUser from "../components/AddEditUser";

    export default {
        name: "users",
        components: {AddEditUser, AppSelect2},
        data() {
            return {
                list: ['departments', 'positions', 'brands', 'countries', 'roles'],
                filterLists: {
                    departments: [],
                    positions: [],
                    brands: [],
                    countries: [],
                    roles: [],
                    status: [
                        {
                            name: 'Active',
                            id: 1
                        }, {
                            name: 'Inactive',
                            id: 0
                        }
                    ],
                },
                filter: {
                    page: 1,
                    length: 10,
                    role: '',
                    department: '',
                    position: '',
                    brand: '',
                    country: '',
                    nationality: '',
                    active: '',
                    text_search: ''
                },
                users: {},
                currentPage: 1,
                lastPage: null,
                userInAction: false,
                userToEdit: null
            }
        },
        watch: {
            'filter': {
                deep: true,
                handler: 'getUsers'
            }
        },
        mounted() {
            this.list.map(li => {
                users.getFilterList(li)
                    .then(res => {
                        this.filterLists[li] = res;
                    })
            });

            /**
             * Initialize pagination select
             */
            let that = this;
            $('.pagination-options').select2({
                width: 'resolve',
                placeholder: 'Please select option'
            }).on('change', function () {
                that.filter.page = $('.pagination-options').select2('val');
            });

            /**
             * Get all users
             */
            this.getUsers();

            $('#userForm').on('hidden.bs.modal', function () {
                that.userInAction = false
            })
        },
        methods: {
            getUsers() {
                this.$http.post('https://www.keden-edu.com/kntra/api/users/list', {
                    ...this.filter
                }, {
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.state.token
                    }
                }).then(res => {
                    this.users = res.data.data.data;
                    this.currentPage = res.data.data.data.current_page;
                    this.lastPage = res.data.data.data.last_page;
                })
            },

            /**
             * Method invoked when user form is submitted successfully
             */
            userSaved() {
                $('#userForm').modal('toggle');
                this.userToEdit = null;
                this.getUsers()
            },

            /**
             * EditUser
             */
            EditUser(user) {
                console.log(user)
                this.userToEdit = user;
                this.userInAction = true
            }
        }
    }
</script>

<style scoped>

</style>