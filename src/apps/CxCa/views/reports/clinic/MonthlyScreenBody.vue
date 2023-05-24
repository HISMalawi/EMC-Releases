<template>
    <table>
        <tr class="section-description">
            <td style="font-weight: bold;text-align:left;padding-left:5px;" >Facility:</td>
            <td style="font-weight: bold;text-align:left;padding-left:5px;" >Month/Year:</td>
            <td style="font-weight: bold;text-align:left;padding-left:5px;" colspan="3">Report Officer:</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: bold;text-align:left;padding-left:5px;">Age Group</td>
            <td style="font-weight: bold;text-align:left;padding-left:5px;">Negative</td>
            <td style="font-weight: bold;text-align:left;padding-left:5px;">Positive</td>
            <td style="font-weight: bold;text-align:left;padding-left:5px;">For same day Tx</td>
            <td style="font-weight: bold;text-align:left;padding-left:5px;">Suspect Cancer</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: bold;text-align:center;padding-left:5px;" colspan="5">1st time screened</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >15-19 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_1st_negative_15_19');">{{indicators.mnth_scrn_1st_negative_15_19 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_1st_Positive_15_19');">{{indicators.mnth_scrn_1st_Positive_15_19 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_1st_for_same_day_tx_15_19');">{{indicators.mnth_scrn_1st_for_same_day_tx_15_19 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_1st_suspect_cx_15_19');">{{indicators.mnth_scrn_1st_suspect_cx_15_19 ||  0 }}</a></span></td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >20-24 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_1st_negative_20_24');">{{indicators.mnth_scrn_1st_negative_20_24 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_1st_Positive_20_24');">{{indicators.mnth_scrn_1st_Positive_20_24 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_1st_for_same_day_tx_20_24');">{{indicators.mnth_scrn_1st_for_same_day_tx_20_24 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_1st_suspect_cx_20_24');">{{indicators.mnth_scrn_1st_suspect_cx_20_24 ||  0 }}</a></span></td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >25-29 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_1st_negative_25_29');">{{indicators.mnth_scrn_1st_negative_25_29 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_1st_Positive_25_29');">{{indicators.mnth_scrn_1st_Positive_25_29 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_1st_for_same_day_tx_25_29');">{{indicators.mnth_scrn_1st_for_same_day_tx_25_29 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_1st_suspect_cx_25_29');">{{indicators.mnth_scrn_1st_suspect_cx_25_29 ||  0 }}</a></span></td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >30-34 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_1st_negative_30_34');">{{indicators.mnth_scrn_1st_negative_30_34 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_1st_Positive_30_34');">{{indicators.mnth_scrn_1st_Positive_30_34 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_1st_for_same_day_tx_30_34');">{{indicators.mnth_scrn_1st_for_same_day_tx_30_34 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_1st_suspect_cx_30_34');">{{indicators.mnth_scrn_1st_suspect_cx_30_34 ||  0 }}</a></span></td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >35-39 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_1st_negative_35_39');">{{indicators.mnth_scrn_1st_negative_35_39 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_1st_Positive_35_39');">{{indicators.mnth_scrn_1st_Positive_35_39 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_1st_for_same_day_tx_35_39');">{{indicators.mnth_scrn_1st_for_same_day_tx_35_39 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_1st_suspect_cx_35_39');">{{indicators.mnth_scrn_1st_suspect_cx_35_39 ||  0 }}</a></span></td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >40-44 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_1st_negative_40_44');">{{indicators.mnth_scrn_1st_negative_40_44 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_1st_Positive_40_44');">{{indicators.mnth_scrn_1st_Positive_40_44 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_1st_for_same_day_tx_40_44');">{{indicators.mnth_scrn_1st_for_same_day_tx_40_44 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_1st_suspect_cx_40_44');">{{indicators.mnth_scrn_1st_suspect_cx_40_44 ||  0 }}</a></span></td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >45-49 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_1st_negative_45_49');">{{indicators.mnth_scrn_1st_negative_45_49 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_1st_Positive_45_49');">{{indicators.mnth_scrn_1st_Positive_45_49 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_1st_for_same_day_tx_45_49');">{{indicators.mnth_scrn_1st_for_same_day_tx_45_49 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_1st_suspect_cx_45_49');">{{indicators.mnth_scrn_1st_suspect_cx_45_49 ||  0 }}</a></span></td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >&gt;=50 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_1st_negative_50');">{{indicators.mnth_scrn_1st_negative_50 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_1st_Positive_50');">{{indicators.mnth_scrn_1st_Positive_50 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_1st_for_same_day_tx_50');">{{indicators.mnth_scrn_1st_for_same_day_tx_50 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_1st_suspect_cx_50');">{{indicators.mnth_scrn_1st_suspect_cx_50 ||  0 }}</a></span></td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >Unknown Age</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_1st_negative_unkn');">{{indicators.mnth_scrn_1st_negative_unkn||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_1st_Positive_unkn');">{{indicators.mnth_scrn_1st_Positive_unkn ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_1st_for_same_day_tx_unkn');">{{indicators.mnth_scrn_1st_for_same_day_tx_unkn ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_1st_suspect_cx_unkn');">{{indicators.mnth_scrn_1st_suspect_cx_unkn ||  0 }}</a></span></td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: bold;text-align:center;padding-left:5px;" colspan="7">Rescreened after previous negative</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >15-19 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_rscrnapn_negative_15_19');">{{indicators.mnth_scrn_rscrnapn_negative_15_19 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_rscrnapn_Positive_15_19');">{{indicators.mnth_scrn_rscrnapn_Positive_15_19 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_rscrnapn_for_same_day_tx_15_19');">{{indicators.mnth_scrn_rscrnapn_for_same_day_tx_15_19 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_rscrnapn_suspect_cx_15_19');">{{indicators.mnth_scrn_rscrnapn_suspect_cx_15_19 ||  0 }}</a></span></td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >20-24 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_rscrnapn_negative_20_24');">{{indicators.mnth_scrn_rscrnapn_negative_20_24 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_rscrnapn_Positive_20_24');">{{indicators.mnth_scrn_rscrnapn_Positive_20_24 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_rscrnapn_for_same_day_tx_20_24');">{{indicators.mnth_scrn_rscrnapn_for_same_day_tx_20_24 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_rscrnapn_suspect_cx_20_24');">{{indicators.mnth_scrn_rscrnapn_suspect_cx_20_24 ||  0 }}</a></span></td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >25-29 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_rscrnapn_negative_25_29');">{{indicators.mnth_scrn_rscrnapn_negative_25_29 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_rscrnapn_Positive_25_29');">{{indicators.mnth_scrn_rscrnapn_Positive_25_29 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_rscrnapn_for_same_day_tx_25_29');">{{indicators.mnth_scrn_rscrnapn_for_same_day_tx_25_29 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_rscrnapn_suspect_cx_25_29');">{{indicators.mnth_scrn_rscrnapn_suspect_cx_25_29 ||  0 }}</a></span></td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >30-34 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_rscrnapn_negative_30_34');">{{indicators.mnth_scrn_rscrnapn_negative_30_34 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_rscrnapn_Positive_30_34');">{{indicators.mnth_scrn_rscrnapn_Positive_30_34 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_rscrnapn_for_same_day_tx_30_34');">{{indicators.mnth_scrn_rscrnapn_for_same_day_tx_30_34 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_rscrnapn_suspect_cx_30_34');">{{indicators.mnth_scrn_rscrnapn_suspect_cx_30_34 ||  0 }}</a></span></td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >35-39 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_rscrnapn_negative_35_39');">{{indicators.mnth_scrn_rscrnapn_negative_35_39 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_rscrnapn_Positive_35_39');">{{indicators.mnth_scrn_rscrnapn_Positive_35_39 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_rscrnapn_for_same_day_tx_35_39');">{{indicators.mnth_scrn_rscrnapn_for_same_day_tx_35_39 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_rscrnapn_suspect_cx_35_39');">{{indicators.mnth_scrn_rscrnapn_suspect_cx_35_39 ||  0 }}</a></span></td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >40-44 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_rscrnapn_negative_40_44');">{{indicators.mnth_scrn_rscrnapn_negative_40_44 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_rscrnapn_Positive_40_44');">{{indicators.mnth_scrn_rscrnapn_Positive_40_44 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_rscrnapn_for_same_day_tx_40_44');">{{indicators.mnth_scrn_rscrnapn_for_same_day_tx_40_44 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_rscrnapn_suspect_cx_40_44');">{{indicators.mnth_scrn_rscrnapn_suspect_cx_40_44 ||  0 }}</a></span></td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >45-49 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_rscrnapn_negative_45_49');">{{indicators.mnth_scrn_rscrnapn_negative_45_49 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_rscrnapn_Positive_45_49');">{{indicators.mnth_scrn_rscrnapn_Positive_45_49 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_rscrnapn_for_same_day_tx_45_49');">{{indicators.mnth_scrn_rscrnapn_for_same_day_tx_45_49 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_rscrnapn_suspect_cx_45_49');">{{indicators.mnth_scrn_rscrnapn_suspect_cx_45_49 ||  0 }}</a></span></td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >&gt;=50 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_rscrnapn_negative_50');">{{indicators.mnth_scrn_rscrnapn_negative_50 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_rscrnapn_Positive_50');">{{indicators.mnth_scrn_rscrnapn_Positive_50 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_rscrnapn_for_same_day_tx_50');">{{indicators.mnth_scrn_rscrnapn_for_same_day_tx_50 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_rscrnapn_suspect_cx_50');">{{indicators.mnth_scrn_rscrnapn_suspect_cx_50 ||  0 }}</a></span></td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >Unknown Age</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_rscrnapn_negative_unkn');">{{indicators.mnth_scrn_rscrnapn_negative_unkn||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_rscrnapn_Positive_unkn');">{{indicators.mnth_scrn_rscrnapn_Positive_unkn ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_rscrnapn_for_same_day_tx_unkn');">{{indicators.mnth_scrn_rscrnapn_for_same_day_tx_unkn ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_rscrnapn_suspect_cx_unkn');">{{indicators.mnth_scrn_rscrnapn_suspect_cx_unkn ||  0 }}</a></span></td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: bold;text-align:center;padding-left:5px;" colspan="7">Post-treatment follow-up</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >15-19 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_ptfu_negative_15_19');">{{indicators.mnth_scrn_ptfu_negative_15_19 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_ptfu_Positive_15_19');">{{indicators.mnth_scrn_ptfu_Positive_15_19 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_ptfu_for_same_day_tx_15_19');">{{indicators.mnth_scrn_ptfu_for_same_day_tx_15_19 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_ptfu_suspect_cx_15_19');">{{indicators.mnth_scrn_ptfu_suspect_cx_15_19 ||  0 }}</a></span></td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >20-24 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_ptfu_negative_20_24');">{{indicators.mnth_scrn_ptfu_negative_20_24 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_ptfu_Positive_20_24');">{{indicators.mnth_scrn_ptfu_Positive_20_24 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_ptfu_for_same_day_tx_20_24');">{{indicators.mnth_scrn_ptfu_for_same_day_tx_20_24 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_ptfu_suspect_cx_20_24');">{{indicators.mnth_scrn_ptfu_suspect_cx_20_24 ||  0 }}</a></span></td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >25-29 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_ptfu_negative_25_29');">{{indicators.mnth_scrn_ptfu_negative_25_29 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_ptfu_Positive_25_29');">{{indicators.mnth_scrn_ptfu_Positive_25_29 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_ptfu_for_same_day_tx_25_29');">{{indicators.mnth_scrn_ptfu_for_same_day_tx_25_29 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_ptfu_suspect_cx_25_29');">{{indicators.mnth_scrn_ptfu_suspect_cx_25_29 ||  0 }}</a></span></td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >30-34 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_ptfu_negative_30_34');">{{indicators.mnth_scrn_ptfu_negative_30_34 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_ptfu_Positive_30_34');">{{indicators.mnth_scrn_ptfu_Positive_30_34 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_ptfu_for_same_day_tx_30_34');">{{indicators.mnth_scrn_ptfu_for_same_day_tx_30_34 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_ptfu_suspect_cx_30_34');">{{indicators.mnth_scrn_ptfu_suspect_cx_30_34 ||  0 }}</a></span></td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >35-39 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_ptfu_negative_35_39');">{{indicators.mnth_scrn_ptfu_negative_35_39 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_ptfu_Positive_35_39');">{{indicators.mnth_scrn_ptfu_Positive_35_39 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_ptfu_for_same_day_tx_35_39');">{{indicators.mnth_scrn_ptfu_for_same_day_tx_35_39 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_ptfu_suspect_cx_35_39');">{{indicators.mnth_scrn_ptfu_suspect_cx_35_39 ||  0 }}</a></span></td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >40-44 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_ptfu_negative_40_44');">{{indicators.mnth_scrn_ptfu_negative_40_44 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_ptfu_Positive_40_44');">{{indicators.mnth_scrn_ptfu_Positive_40_44 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_ptfu_for_same_day_tx_40_44');">{{indicators.mnth_scrn_ptfu_for_same_day_tx_40_44 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_ptfu_suspect_cx_40_44');">{{indicators.mnth_scrn_ptfu_suspect_cx_40_44 ||  0 }}</a></span></td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >45-49 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_ptfu_negative_45_49');">{{indicators.mnth_scrn_ptfu_negative_45_49 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_ptfu_Positive_45_49');">{{indicators.mnth_scrn_ptfu_Positive_45_49 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_ptfu_for_same_day_tx_45_49');">{{indicators.mnth_scrn_ptfu_for_same_day_tx_45_49 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_ptfu_suspect_cx_45_49');">{{indicators.mnth_scrn_ptfu_suspect_cx_45_49 ||  0 }}</a></span></td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >&gt;=50 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_ptfu_negative_50');">{{indicators.mnth_scrn_ptfu_negative_50 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_ptfu_Positive_50');">{{indicators.mnth_scrn_ptfu_Positive_50 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_ptfu_for_same_day_tx_50');">{{indicators.mnth_scrn_ptfu_for_same_day_tx_50 ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_ptfu_suspect_cx_50');">{{indicators.mnth_scrn_ptfu_suspect_cx_50 ||  0 }}</a></span></td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >Unknown Age</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_ptfu_negative_unkn');">{{indicators.mnth_scrn_ptfu_negative_unkn||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_ptfu_Positive_unkn');">{{indicators.mnth_scrn_ptfu_Positive_unkn ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_ptfu_for_same_day_tx_unkn');">{{indicators.mnth_scrn_ptfu_for_same_day_tx_unkn ||  0 }}</a></span></td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" ><span><a href="#" @click.prevent="drillDown('mnth_scrn_ptfu_suspect_cx_unkn');">{{indicators.mnth_scrn_ptfu_suspect_cx_unkn ||  0 }}</a></span></td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: bold;text-align:center;padding-left:5px;" colspan="7">Month Summary</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >Total Screened </td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" colspan="4"><span><a href="#" @click.prevent="drillDown('mnth_scrn_total_screened');">{{indicators.mnth_scrn_total_screened ||  0 }}</a></span></td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >Total Negative</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" colspan="4"><span><a href="#" @click.prevent="drillDown('mnth_scrn_total_negative');">{{indicators.mnth_scrn_total_negative ||  0 }}</a></span></td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >Total VIA+ & eligible for same day Tx </td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" colspan="4"><span><a href="#" @click.prevent="drillDown('mnth_scrn_total_via_positive_eligible_same_day_tx');">{{indicators.mnth_scrn_total_via_positive_eligible_same_day_tx ||  0 }}</a></span></td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >Total Positive </td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" colspan="4"><span><a href="#" @click.prevent="drillDown('mnth_scrn__total_positive');">{{indicators.mnth_scrn__total_positive ||  0 }}</a></span></td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >Total Suspected cancer</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" colspan="4"><span><a href="#" @click.prevent="drillDown('mnth_scrn_suspected_cx');">{{indicators.mnth_scrn_suspected_cx ||  0 }}</a></span></td>
        </tr>
    </table>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    indicators: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['onClickIndicator'],
  methods: {
    drillDown(indicatorsName: string){
      this.$emit('onClickIndicator', indicatorsName)
    }
  }
})
</script>
<style scoped>
a {
  color: #337ab7;
  text-decoration: none;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  border: 1px solid rgb(0, 0, 0);
}
tr {
  height: 45px;
  border: 1px solid rgb(0, 0, 0);
}
td {
  border: 1px solid rgb(0, 0, 0);
  text-align: center;
}

.section-description td {
  border-width: 1px;
}
.numbers {
  width: 2.5%;
  text-align: center;
  border-width: 0px 1px 0px 0px;
  border-style: dotted;
}
.sum-arrows {
  width: 75px;
  height: 55px;
}
.postfixes {
  font-size: x-small;
  font-weight: bold;
  position: relative;
  top: -15px;
  left: -40px;
}
ion-col > span {
  font-size: 0.7rem;
}
</style>