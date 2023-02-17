<!-- eslint-disable vue/multi-word-component-names -->
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
