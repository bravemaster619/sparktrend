<template>
    <div class="purchase-tabs">
        <Tabs orientation="vertical" :options="{ useUrlFragment: false }">
            <Tab :name="$t('awaiting payment')"  :selected="true">
                <request-accordion>

                </request-accordion>
            </Tab>
            <Tab :name="$t('request')" >
                <no-data></no-data>
            </Tab>
            <Tab :name="$t('accepted')" >
                <request-accordion>

                </request-accordion>
            </Tab>
            <Tab :name="$t('ongoing')">
                <no-data></no-data>
            </Tab>
            <Tab :name="$t('completed')">
                <request-accordion>

                </request-accordion>
            </Tab>
        </Tabs>
    </div>
</template>

<script>
    import {Tabs , Tab} from 'vue-tabs-component'
    import RequestAccordion from './RequestAccordion';
    import NoData from './NoData';

    export default {
        name: "PurchaseTabs",
        components: {
            Tabs,
            Tab,
            RequestAccordion,
            NoData
        }
    }
</script>

<style scoped>

</style>