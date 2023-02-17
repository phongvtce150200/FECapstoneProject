<template>
  <div>
    <button
      class="btn btn-success"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      Create new Medicine
    </button>
  </div>

  <hr />
  <div>
    <table class="table table-hover text-center" id="example">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Medicine Name</th>
          <th scope="col">Price</th>
          <th scope="col">Expiration</th>
          <th scope="col">Amount</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody id="medicineBody">
        <tr>
          <td>@item.medicineId</td>
          <td>@item.medicineName</td>
          <td>@item.price</td>
          <td>@item.expiration.ToShortDateString()</td>
          <td>@item.amount</td>
          <td>
            <button
              class="btn btn-warning me-2"
              data-bs-toggle="modal"
              data-bs-target="#EditexampleModal"
              name="test"
            >
              Edit
            </button>
            <button
              class="btn btn-danger"
              data-bs-toggle="modal"
              data-bs-target="#DeleteexampleModal"
              name="delete"
            >
              Delete
            </button>
            <input type="hidden" asp-for="@item.medicineId" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      presciptions: [
        { brand: "Volkswagen", year: 2012, color: "Orange", vin: "dsad231ff" },
        { brand: "Audi", year: 2011, color: "Black", vin: "gwregre345" },
        { brand: "Renault", year: 2005, color: "Gray", vin: "h354htr" },
        { brand: "BMW", year: 2003, color: "Blue", vin: "j6w54qgh" },
        { brand: "Mercedes", year: 1995, color: "Orange", vin: "hrtwy34" },
        { brand: "Volvo", year: 2005, color: "Black", vin: "jejtyj" },
        { brand: "Honda", year: 2012, color: "Yellow", vin: "g43gr" },
        { brand: "Jaguar", year: 2013, color: "Orange", vin: "greg34" },
        { brand: "Ford", year: 2000, color: "Black", vin: "h54hw5" },
        { brand: "Fiat", year: 2013, color: "Red", vin: "245t2s" },
      ],
    };
  },
};
</script>
