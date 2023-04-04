<template>
    <table>
        <tr class="section-description">
            <td style="font-weight: bold;text-align:left;padding-left:5px;" >Facility:</td>
            <td style="font-weight: bold;text-align:left;padding-left:5px;" colspan="2">Month/Year:</td>
            <td style="font-weight: bold;text-align:left;padding-left:5px;" colspan="4">Report Officer:</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: bold;text-align:left;padding-left:5px;">Age Disaggregate</td>
            <td style="font-weight: bold;text-align:left;padding-left:5px;">Cryotherapy</td>
            <td style="font-weight: bold;text-align:left;padding-left:5px;">Thermocoagulation</td>
            <td style="font-weight: bold;text-align:left;padding-left:5px;">LEEP</td>
            <td style="font-weight: bold;text-align:left;padding-left:5px;">VIA+ Deferred Tx</td>
            <td style="font-weight: bold;text-align:left;padding-left:5px;">VIA+ Referred</td>
            <td style="font-weight: bold;text-align:left;padding-left:5px;">CXCA Suspect Referred</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: bold;text-align:center;padding-left:5px;" colspan="7">1st time screened</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >15-19 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_cryotherapy_15_19 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_thermocoagulation_15_19 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_leep_15_19 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_via_positive_deferred_tx_15_19 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_via_positive_referred_tx_15_19 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_cxca_suspect_referred_15_19 ||  0 }}</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >20-24 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_cryotherapy_20_24||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_thermocoagulation_20_24 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_leep_20_24 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_via_positive_deferred_tx_20_24 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_via_positive_referred_tx_20_24 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_cxca_suspect_referred_20_24 ||  0 }}</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >25-29 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_cryotherapy_25_29||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_thermocoagulation_25_29 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_leep_25_29||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_via_positive_deferred_tx_25_29 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_via_positive_referred_tx_25_29 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_cxca_suspect_referred_25_29 ||  0 }}</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >30-34 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_cryotherapy_30_34||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_thermocoagulation_30_34 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_leep_30_34||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_via_positive_deferred_tx_30_34||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_via_positive_referred_tx_30_34 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_cxca_suspect_referred_30_34 ||  0 }}</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >35-39 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_cryotherapy_35_39||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_thermocoagulation_35_39 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_leep_35_39||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_via_positive_deferred_tx_35_39||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_via_positive_referred_tx_35_39 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_cxca_suspect_referred_35_39 ||  0 }}</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >40-44 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_cryotherapy_40_44||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_thermocoagulation_40_44 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_leep_40_44||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_via_positive_deferred_tx_40_44||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_via_positive_referred_tx_40_44 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_cxca_suspect_referred_40_44 ||  0 }}</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >45-49 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_cryotherapy_45_49||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_thermocoagulation_45_49 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_leep_40_44||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_via_positive_deferred_tx_45_49||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_via_positive_referred_tx_45_49 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_cxca_suspect_referred_45_49 ||  0 }}</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >&gt;=50 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_cryotherapy_50||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_thermocoagulation_50 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_leep_50 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_via_positive_deferred_tx_50 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_via_positive_referred_tx_50 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_cxca_suspect_referred_50 ||  0 }}</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >Unknown Age</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_cryotherapy_unkn||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_thermocoagulation_unkn ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_leep_unkn ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_via_positive_deferred_tx_unkn ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_via_positive_referred_tx_unkn ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_1st_cxca_suspect_referred_unkn ||  0 }}</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: bold;text-align:center;padding-left:5px;" colspan="7">Rescreened after previous negative</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >15-19 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_cryotherapy_15_19 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_thermocoagulation_15_19 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_leep_15_19 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_via_positive_deferred_tx_15_19 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_via_positive_referred_tx_15_19 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_cxca_suspect_referred_15_19 ||  0 }}</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >20-24 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_cryotherapy_20_24||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_thermocoagulation_20_24 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_leep_20_24 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_via_positive_deferred_tx_20_24 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_via_positive_referred_tx_20_24 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_cxca_suspect_referred_20_24 ||  0 }}</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >25-29 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_cryotherapy_25_29||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_thermocoagulation_25_29 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_leep_25_29||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_via_positive_deferred_tx_25_29 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_via_positive_referred_tx_25_29 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_cxca_suspect_referred_25_29 ||  0 }}</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >30-34 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_cryotherapy_30_34||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_thermocoagulation_30_34 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_leep_30_34||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_via_positive_deferred_tx_30_34||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_via_positive_referred_tx_30_34 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_cxca_suspect_referred_30_34 ||  0 }}</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >35-39 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_cryotherapy_35_39||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_thermocoagulation_35_39 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_leep_35_39||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_via_positive_deferred_tx_35_39||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_via_positive_referred_tx_35_39 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_cxca_suspect_referred_35_39 ||  0 }}</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >40-44 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_cryotherapy_40_44||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_thermocoagulation_40_44 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_leep_40_44||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_via_positive_deferred_tx_40_44||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_via_positive_referred_tx_40_44 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_cxca_suspect_referred_40_44 ||  0 }}</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >45-49 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_cryotherapy_45_49||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_thermocoagulation_45_49 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_leep_40_44||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_via_positive_deferred_tx_45_49||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_via_positive_referred_tx_45_49 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_cxca_suspect_referred_45_49 ||  0 }}</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >&gt;=50 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_cryotherapy_50||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_thermocoagulation_50 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_leep_50 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_via_positive_deferred_tx_50 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_via_positive_referred_tx_50 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_cxca_suspect_referred_50 ||  0 }}</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >Unknown Age</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_cryotherapy_unkn||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_thermocoagulation_unkn ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_leep_unkn ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_via_positive_deferred_tx_unkn ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_via_positive_referred_tx_unkn ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_cxca_suspect_referred_unkn ||  0 }}</td>
        </tr>

        <tr class="section-description">
            <td style="font-weight: bold;text-align:left;padding-left:5px;" colspan="7"> </td>
        </tr>

        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >15-19 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_cryotherapy_15_19 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_thermocoagulation_15_19 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_leep_15_19 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_via_positive_deferred_tx_15_19 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_via_positive_referred_tx_15_19 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_cxca_suspect_referred_15_19 ||  0 }}</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >20-24 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_cryotherapy_20_24||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_thermocoagulation_20_24 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_leep_20_24 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_via_positive_deferred_tx_20_24 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_via_positive_referred_tx_20_24 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_rscrnapn_cxca_suspect_referred_20_24 ||  0 }}</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >25-29 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_cryotherapy_25_29||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_thermocoagulation_25_29 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_leep_25_29||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_via_positive_deferred_tx_25_29 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_via_positive_referred_tx_25_29 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_cxca_suspect_referred_25_29 ||  0 }}</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >30-34 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_cryotherapy_30_34||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_thermocoagulation_30_34 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_leep_30_34||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_via_positive_deferred_tx_30_34||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_via_positive_referred_tx_30_34 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_cxca_suspect_referred_30_34 ||  0 }}</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >35-39 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_cryotherapy_35_39||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_thermocoagulation_35_39 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_leep_35_39||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_via_positive_deferred_tx_35_39||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_via_positive_referred_tx_35_39 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_cxca_suspect_referred_35_39 ||  0 }}</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >40-44 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_cryotherapy_40_44||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_thermocoagulation_40_44 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_leep_40_44||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_via_positive_deferred_tx_40_44||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_via_positive_referred_tx_40_44 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_cxca_suspect_referred_40_44 ||  0 }}</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >45-49 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_cryotherapy_45_49||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_thermocoagulation_45_49 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_leep_40_44||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_via_positive_deferred_tx_45_49||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_via_positive_referred_tx_45_49 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_cxca_suspect_referred_45_49 ||  0 }}</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >&gt;=50 years</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_cryotherapy_50||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_thermocoagulation_50 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_leep_50 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_via_positive_deferred_tx_50 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_via_positive_referred_tx_50 ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_cxca_suspect_referred_50 ||  0 }}</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >Unknown Age</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_cryotherapy_unkn||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_thermocoagulation_unkn ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_leep_unkn ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_via_positive_deferred_tx_unkn ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_via_positive_referred_tx_unkn ||  0 }}</td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >{{indicators.tx_blnk_cxca_suspect_referred_unkn ||  0 }}</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: bold;text-align:left;padding-left:5px;" colspan="7"> </td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >Total Cryotherapy </td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" colspan="7">{{indicators.total_cryotherapy ||  0 }}</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >Total Thermocoagulation </td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" colspan="7">{{indicators.total_thermocoagulation ||  0 }}</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >Total LEEP </td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" colspan="7">{{indicators.total_leep ||  0 }}</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >Total # Same day Tx </td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" colspan="7">{{indicators.total_num_same_day_treatment ||  0 }}</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >Total VIA+ Deferred Tx </td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" colspan="7">{{indicators.total_via_positive_deferred_tx ||  0 }}</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >Total VIA+ Referred </td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" colspan="7">{{indicators.total_via_positive_referred_tx ||  0 }}</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >Total CXCA Suspects Referred </td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" colspan="7">{{indicators.total_cxca_suspects_referred ||  0 }}</td>
        </tr>
        <tr class="section-description">
            <td style="font-weight: normal;text-align:left;padding-left:5px;" >Total Referred </td>
            <td style="font-weight: normal;text-align:left;padding-left:5px;" colspan="7">{{indicators.total_referred ||  0 }}</td>
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