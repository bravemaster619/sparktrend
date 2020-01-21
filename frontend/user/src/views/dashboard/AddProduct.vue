<template>
    <div class="add-product">
        <add-product-check v-if="status==='check'" @next="next" tab_id=0>
        </add-product-check>
        <add-product-verify v-if="status==='verify'" tab_id="1" @back="back" @next="next"
                            :verificationCode="verification_code" :username="username" :_id="insta_id">
        </add-product-verify>
        <add-product-insights v-if="status==='insights'" tab_id="2" @back="back" @next="next" :_id="insta_id">
        </add-product-insights>
        <add-product-price v-if="status==='price'" tab_id="3" :_id="insta_id"></add-product-price>
    </div>
</template>

<script>
    import AddProductInsights from "../components/Dashboard/AddProductInsights";
    import AddProductCheck from "../components/Dashboard/AddProductCheck";
    import AddProductVerify from "../components/Dashboard/AddProductVerify";
    import AddProductPrice from "../components/Dashboard/AddProductPrice";

    export default {
        name: "AddProduct",
        components: {
            AddProductInsights,
            AddProductCheck,
            AddProductVerify,
            AddProductPrice
        },
        data () {
            return {
                status_enum: [
                    "check", "verify", "insights", "price"
                ],
                status : "check",
                current_tab_id: 0,
                verification_code   : "",
                insta_id            : -1,
                username            : "",
                verified         : false,
                insight_url         : ""
            }
        },
        methods :    {
            next(tab_id, result) {
                this.current_tab_id = tab_id;
                switch (tab_id) {
                    case "0": this.processCheck(result); break;
                    case "1": this.processVerify(result); break;
                    case "2": this.processInsight(result); break;
                }
            },
            back(tab_id){
                this.status = this.status_enum[--tab_id];
            },
            processCheck(result){
                if(!this.isEmpty(result.verification_code)){
                    this.verification_code = result.verification_code;
                    this.username = result.username;
                    this.insta_id = result.id;
                    this.status = this.status_enum[++this.current_tab_id];
                }
            },
            processVerify(result){
                this.verified = result.verified;
                if(this.verified) {
                    this.status = this.status_enum[++this.current_tab_id];
                }
            },
            processInsight(result){
                if(!this.isEmpty(result.insight)){
                    this.insight_url = result.insight;
                    this.status = this.status_enum[++this.current_tab_id];
                }
            }
        }
    }
</script>

<style scoped>

</style>