<template>
    <div class="table-container">
        <table id="t_id">
            <thead>
                <tr>
                    <th style="border: none; width: 207px;"></th>
                    <th style="border: none; width: 118px;"></th>
                    <th style="width: 64px;">Out-patient</th>
                    <th colspan="2" style="width: 217px;">In-patient</th>
                </tr>

                <tr>
                    <th style="border: none; min-width: 50px; width: 229px;"></th>
                    <th style="border: none; width: 241px;"></th>
                    <td style="min-width: 50px; max-width: 50px; width: 207px;"> Cases </td>
                    <td style="min-width: 50px; max-width: 50px; width: 118px;"> Cases </td>
                    <td style="min-width: 50px; max-width: 50px; width: 64px;"> Deaths </td>
                </tr>
            </thead>
            <tbody>       
                <tr>
                    <td class="left" rowspan="2" style="width: 217px;"> Malaria &lt; 5 years </td>
                    <td class="left" style="width: 229px;"> Uncomplicated </td>
                    <td style="width: 241px;"> 0 </td>
                    <td class="disable"> </td>
                    <td class="disable"> </td>
                </tr>
                
                <tr>
                    <td class="left"> Severe </td>
                    <td class="disable">  </td>
                    <td> 0 </td>
                    <td> 0 </td>
                </tr>
                <tr>
                    <td class="left" rowspan="2"> Malaria &gt;= 5 years </td>
                    <td class="left"> Uncomplicated </td>
                    <td>0</td>
                    <td class="disable">  </td>
                    <td class="disable"> </td>
                </tr>
                <tr>
                    <td class="left"> Severe </td>
                    <td class="disable"> </td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td class="left" rowspan="2"> Malaria in Pregnant women </td>
                    <td class="left"> Uncomplicated </td>
                    <td>0</td>
                    <td class="disable">  </td>
                    <td class="disable">  </td>
                </tr>
                <tr>
                    <td class="left"> Severe </td>
                    <td class="disable">  </td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td class="left" colspan="2"> In-patient malaria with severe anemia (&lt;5y) </td>
                    <td class="disable"> </td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td class="left" colspan="2"> Uncomplicated malaria &lt;5y, lab-confirmed </td>
                    <td>0</td>
                    <td class="disable">  </td>
                    <td class="disable">  </td>
                </tr>
                <tr>
                    <td class="left" colspan="2"> Uncomplicated malaria &lt;5+, lab-confirmed </td>
                    <td>0</td>
                    <td class="disable">  </td>
                    <td class="disable">  </td>
                </tr>
                <tr>
                    <td class="left" colspan="2"> Pneumonia (&lt;5 years) </td>
                    <td>0</td>
                    <td class="disable">  </td>
                    <td class="disable">  </td>
                </tr>
                <tr>
                    <td class="left" colspan="2"> Severe pneumonia (&lt;5 years) </td>
                    <td class="disable"> </td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td class="left" colspan="2"> Very severe pneumonia (&lt;5 years) </td>
                    <td class="disable">  </td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                
                <tr>
                    <td class="left" colspan="2"> Diarrhoea with dehydration </td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                
                <tr>
                    <td class="left" colspan="2"> New AIDS cases </td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td class="left" colspan="2"> Male urethral discharge </td>
                    <td>0</td>
                    <td class="disable"> </td>
                    <td class="disable">  </td>
                </tr>
                <tr>
                    <td class="left" colspan="2"> Male non-vesicular genital ulcer </td>
                    <td>0</td>
                    <td class="disable"> </td>
                    <td class="disable"> </td>
                </tr>
                <tr>
                    <td class="left" colspan="2"> Female non-vesicular genital ulcer </td>
                    <td>0</td>
                    <td class="disable"> </td>
                    <td class="disable"> </td>
                </tr>
                <tr>
                    <td class="left" colspan="2"> Diarrhoea with blood </td>
                    <td>0</td>
                    <td class="disable"> </td>
                    <td class="disable"> </td>
                </tr>
                <tr>
                    <td class="left" colspan="2"> Schistosomiasis urinary </td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td class="left" colspan="2"> Schistosomiasis intestinal </td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr style="border:none;">
                    <td style="border:none;"> &nbsp; </td>
                    <td style="border:none;">  </td>
                    <td style="border:none;">  </td>
                    <td style="border:none;">  </td>
                    <td style="border:none;">  </td>
                </tr>
                
                <tr>
                    <td class="bold" style="border:none;"> </td>
                    <td class="bold"> Out-patient </td>
                    <td class="bold"> In-patient </td>
                    <td class="bold"> Deaths </td>
                </tr>
                <tr>
                    <td class="left"> AFP </td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td class="left"> Cholera </td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td class="left"> Measles </td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td class="left"> Meningitis </td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td class="left"> Neonatal tetanus </td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td class="left"> Plague </td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td class="left"> Viral Hemorrhagic Fever </td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td class="left"> Diarrhoea with blood </td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script lang="ts">
   
</script>
<style scoped>
    <style>
/* Add styles to the table */
#t_id {
  border-collapse: collapse;
  width: 100%;
}

/* Style the table headers */
#t_id th {
  border: 1px solid #000; /* Add a 1px border to the header cells */
  background-color: #f0f0f0; /* Background color for headers */
  padding: 8px; /* Add some padding to the header cells */
}

/* Style the table data cells */
#t_id td {
  border: 1px solid #000; /* Add a 1px border to the data cells */
  padding: 8px; /* Add some padding to the data cells */
  text-align: center; /* Center align text in data cells */
}

/* Style the cells with "Cases" and "Deaths" as gray */
#t_id td:empty {
  background-color: #e0e0e0; /* Gray background for empty cells */
}

/* Make cells in the "Out-patient" column bold */
#t_id td:nth-child(3) {
  font-weight: bold;
}

/* Make the headers slightly bolder */
#t_id th {
  font-weight: bold;
}

/* Add a little extra padding to the header row for spacing */
#t_id thead tr:first-child th {
  padding-top: 12px;
}
/* Add styles to the table container */
.table-container {
  max-height: 400px; /* Adjust the max height as needed */
  overflow: auto; /* Add scrollbars when the table exceeds the max height */
}

/* Add styles to the table */
#t_id {
  border-collapse: collapse;
  width: 100%;
}
</style>