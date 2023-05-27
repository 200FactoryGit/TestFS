import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { User } from "../../../Models/User";
import { UserService } from "../../../Services/user.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "fname",
    "lname",
    "email",
    "isactivated",
    "Activer",
    "Desactiver",
    "Modifier",
    "Supprimer",
  ];
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  users: User[];
  private _id: number;

  constructor(
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private usersService: UserService,
    private router: Router
  ) {}
  edit(User) {
    this._id = User.id;
    this.router.navigate(["home/edit/" + this._id]);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.usersService.getAllUsers().subscribe((data: User[]) => {
      this.users = data;
      console.log(this.users);

      this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.paginator = this.paginator;
    });
  }

  activate(model) {
    this.usersService.activate(model).subscribe((data) => {
      this.users = data;
      this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.paginator = this.paginator;
      this.changeDetectorRefs.detectChanges();
    });
  }
  desactivate(model) {
    this.usersService.desactivate(model).subscribe((data) => {
      this.users = data;
      this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.paginator = this.paginator;
      this.changeDetectorRefs.detectChanges();
    });
  }

  delete(user): void {
    Swal.fire({
      title: "Etes vous sur de vouloir supprimer cet utilisateur?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Oui",
      denyButtonText: `Non`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.usersService.delete(user).subscribe((data) => {
          this.users = this.users.filter((u) => u !== user);
          this.dataSource = new MatTableDataSource<User>(this.users);
          this.dataSource.paginator = this.paginator;
          this.changeDetectorRefs.detectChanges();
          Swal.fire("Supprimé!", "", "success");
        });
      } else if (result.isDenied) {
        Swal.fire("Operation annulé", "", "info");
      }
    });
  }
  /*
      edit(employe: users) {
        this._id = employe.id;
        this.router.navigate(['home/edit/' + this._id]);
      }
    */
}
