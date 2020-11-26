<template>
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">User Form</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <form @submit.prevent="submit" class="modal-body position-relative">
            <div class="loading-block" v-if="loading">
                <i class="fa fa-spin fa-spinner"></i>
            </div>

                <!--name-->
                <div class="custom-row mb-2">
                    <label class="width-150">Name*</label>
                    <div class="width-200">
                        <input type="text" class="form-control" v-model="form.name" required
                               @input="delete errors.name">
                        <p class="text-danger small" v-if="errors.hasOwnProperty('name')">{{errors.name[0]}}</p>
                    </div>
                </div>

                <!--address-->
                <div class="custom-row mb-2">
                    <label class="width-150">Address*</label>
                    <div class="width-200">
                        <input type="text" class="form-control" v-model="form.address" required
                               @input="delete errors.address">
                        <p class="text-danger small" v-if="errors.hasOwnProperty('address')">{{errors.address[0]}}</p>
                    </div>
                </div>

                <!--phone-->
                <div class="custom-row mb-2">
                    <label class="width-150">Phone*</label>
                    <div class="width-200">
                        <input type="text" class="form-control" v-model="form.phone"
                               :class="{'border-danger': !valid}" required
                               @keypress="validatePhone('phone', $event)"
                               @input="delete errors.phone">
                        <p class="text-danger small" v-if="errors.hasOwnProperty('phone')">{{errors.phone[0]}}</p>
                    </div>
                </div>

                <!--email-->
                <div class="custom-row mb-2">
                    <label class="width-150">Email</label>
                    <div class="width-200">
                        <input type="email" class="form-control" v-model="form.email">
                    </div>
                </div>

                <!--gender-->
                <div class="custom-row mb-2">
                    <label class="width-150">Gender*</label>
                    <div class="width-200">
                        <AppSelect2 :options="['Female', 'Male']"
                                    :value="form.gender"
                                    @optionSelected="opt =>{ $set(form, 'gender', opt); delete errors.gender}"></AppSelect2>
                        <p class="text-danger small" v-if="errors.hasOwnProperty('gender')">{{errors.gender[0]}}</p>

                    </div>
                </div>

                <!--department-->
                <div class="custom-row mb-2">
                    <label class="width-150">Department*</label>
                    <div class="width-200">
                        <AppSelect2 :options="filterLists.departments" :keys="['id', 'name']"
                                    :value="form.department_id"
                                    @optionSelected="opt => {$set(form, 'department_id', opt); $delete(errors, 'department_id')}"></AppSelect2>
                        <p class="text-danger small" v-if="errors.hasOwnProperty('department_id')">
                            {{errors.department_id[0]}}</p>
                    </div>
                </div>

                <!--country-->
                <div class="custom-row mb-2">
                    <label class="width-150">Country*</label>
                    <div class="width-200">
                        <AppSelect2 :options="filterLists.countries" :keys="['id', 'name']"
                                    @optionSelected="opt => {form.country_id = opt; delete errors.country_id}"></AppSelect2>
                        <p class="text-danger small" v-if="errors.hasOwnProperty('country_id')">{{errors.country_id[0]}}</p>

                    </div>
                </div>

                <!--region-->
                <div class="custom-row mb-2">
                    <label class="width-150">Region*</label>
                    <div class="width-200">
                        <AppSelect2 :options="regions" :keys="['id', 'name']"
                                    :disabled="form.country_id? false: true"
                                    @optionSelected="opt => {$set(form, 'region_id', opt); $delete(errors, 'region_id')}"></AppSelect2>
                        <p class="text-muted mb-0 small">Please select country at first</p>
                        <p class="text-danger small" v-if="errors.hasOwnProperty('region_id')">{{errors.region_id[0]}}</p>
                    </div>
                </div>

                <!--nationality-->
                <div class="custom-row mb-2">
                    <label class="width-150">Nationality*</label>
                    <div class="width-200">
                        <AppSelect2 :options="filterLists.countries" :keys="['id', 'name']"
                                    @optionSelected="opt => {form.nationality_id = opt; $delete(errors, 'nationality_id')}"></AppSelect2>
                        <p class="text-danger small" v-if="errors.hasOwnProperty('nationality_id')">
                            {{errors.nationality_id[0]}}</p>
                    </div>
                </div>

                <!--role-->
                <div class="custom-row mb-2">
                    <label class="width-150">Role*</label>
                    <div class="width-200">
                        <AppSelect2 :options="filterLists.roles" :keys="['name', 'name']"
                                    @optionSelected="opt => {form.role = opt; $delete(errors, 'role')}"></AppSelect2>
                        <p class="text-danger small" v-if="errors.hasOwnProperty('role')">{{errors.role[0]}}</p>
                    </div>
                </div>

                <!--brand-->
                <div class="custom-row mb-2">
                    <label class="width-150">Brand</label>
                    <div class="width-200">
                        <AppSelect2 :options="filterLists.brands" :keys="['id', 'name']"
                                    @optionSelected="opt => {form.brand_id = opt}"></AppSelect2>
                    </div>
                </div>


                <!--positions-->
                <div class="custom-row mb-2">
                    <label class="width-150">Positions</label>
                    <div class="width-200">
                        <AppSelect2 :options="filterLists.positions" :keys="['id', 'name']"
                                    @optionSelected="opt => {form.position_id = opt}"></AppSelect2>
                    </div>
                </div>

                <!--extension number-->
                <div class="custom-row mb-2">
                    <label class="width-150">Extension Number</label>
                    <div class="width-200">
                        <input type="text" class="form-control" v-model="form.extension_number"
                               :class="{'border-danger': !validExtension}"
                               @keypress="validatePhone('extension', $event)" @input="$delete(errors, 'extension_number')">
                        <p class="text-danger small" v-if="errors.hasOwnProperty('extension_number')">
                            {{errors.extension_number[0]}}</p>

                    </div>
                </div>

                <div class="custom-row mb-2">
                    <label class="width-150">Working Scope</label>
                    <div class="width-200">
                        <input type="text" class="form-control" v-model="form.working_scope">
                    </div>
                </div>

                <button class="btn btn-primary" type="submit">Submit</button>
        </form>
    </div>
</template>

<script>
    import AppSelect2 from "./AppSelect2";
    import users from "../api/users";

    export default {
        name: "AddEditUser",
        components: {AppSelect2},
        props: ['filterLists', 'userToEdit'],
        data() {
            return {
                form: {
                    country_id: null,
                    department_id: null,
                    region_id: null
                },
                valid: true,
                validExtension: true,
                regions: [],
                errors: {},
                loading: false
            }
        },
        mounted() {
          if (this.userToEdit) {
              this.form = this.userToEdit
          }
        },
        watch: {
            'form.country_id'() {
                users.getRegions(this.form.country_id)
                    .then(res => {
                        this.regions = res.regions_list
                    })
            }
        },
        methods: {
            validatePhone(key, $event) {
                let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
                if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
                    $event.preventDefault();
                    key == 'phone' ? this.valid = false : this.validExtension = false
                } else {
                    key == 'phone' ? this.valid = true : this.validExtension = true
                }
            },

            submit() {
                this.loading = true;
                users.submitUser(this.form.id? this.form.id: 0, {
                    ...this.form,
                    phone: parseInt(this.form.phone),
                    extension_number: parseInt(this.form.extension_number)
                })
                    .then(() => {
                        this.$emit('userSaved');
                        this.loading = false;
                    })
                    .catch(errors => {
                        this.errors = errors;
                        this.loading = false;
                    })
            }
        }
    }
</script>

<style scoped>

</style>