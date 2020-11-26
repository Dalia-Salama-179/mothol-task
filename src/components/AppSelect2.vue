<template>
    <select class="select2-obj" style="width: 100%" ref="select2Obj" :disabled="disabled">
        <option></option>
        <template v-if="keys">
            <option v-for="(dept) in options" :key="dept[keys[0]]" :value="dept[keys[0]]"
                    :selected="dept[keys[0]] == parseInt(value)">{{dept[keys[1]]}}</option>
        </template>
        <template v-else>
            <option v-for="opt in options" :key="opt" :value="opt"
                    :selected="opt == value">{{opt}}</option>
        </template>
    </select>
</template>

<script>
    import $ from "jquery";

    export default {
        name: "AppSelect2",
        props: ['options', 'keys', 'disabled', 'value'],
        watch: {
            'value'() {

                if (this.value) {
                    $(this.$refs.select2Obj).select2("val", this.value);
                }
            }
        },
        mounted() {
            let that = this;

            if (this.value) {
                $(this.$refs.select2Obj).select2("val", this.value);
            }
            $(this.$refs.select2Obj).select2({
                width: 'resolve',
                allowClear: true,
                placeholder: 'Please select option'
            }).on('change', function () {
                that.$emit('optionSelected', $(that.$refs.select2Obj).select2('val'))
            })
        }
    }
</script>

<style scoped>

</style>