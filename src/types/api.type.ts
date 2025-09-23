export interface PaginationQuery {
  page?: number; // default 1
  limit?: number; // default 10
  orderBy?: string; // e.g. "createdDate"
  orderDir?: "ASC" | "DESC";
  startDate?: string;
  endDate?: string;
}

export interface PaginationResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Ticket
export interface ITicket {
  id?: number;
  title?: string;
  description?: string;
  createdBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
  status?: string;
}

export type IGetListTicketResponse = PaginationResponse<ITicket>;

export interface SearchTicketQuery extends PaginationQuery {
  title?: string;
  status?: string;
  assigneeId?: number;
  createdById?: number;
  teamId?: number;
  sprintId?: number;
}

export interface SearchTicketFormValues {
  title?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}

export interface CreateTicketRequest {
  id?: number;
  title?: string;
  status?: string;
  description?: string;
  assigneeId?: number;
  teamId?: number;
  sprintId?: number;
}
// End Ticket

export interface IUser {
  id?: number;
  username?: string;
  isActive?: boolean;
  createdDate?: Date;
  updatedDate?: Date;
  roles?: string[];
}

export type IGetListUserResponse = PaginationResponse<IUser>;

export interface SearchUserQuery extends PaginationQuery {
  username?: string;
  isActive?: string;
  role?: string;
}

export interface UpdateUserRequest {
  id?: number;
  isActive?: boolean;
}
export interface CreateUserRequest {
  username?: string;
  password?: string;
}

// End User

export interface ITeam {
  id?: number;
  name?: string;
  createdById?: number;
  createdBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}

export type IGetListTeamResponse = PaginationResponse<ITeam>;

export interface SearchTeamQuery extends PaginationQuery {
  name?: string;
}

export interface UpdateTeamRequest {
  id?: number;
  name?: string;
}

export interface CreateTeamRequest {
  name: string;
}
export interface SearchTeamFormValues {
  name?: string;
}

// End Team

export interface ISprint {
  id?: number;
  title?: string;
  teamId?: number;
  createdById?: number;
  createdBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
  startDate?: Date;
  endDate?: Date;
}

export type IGetListSprintResponse = PaginationResponse<ISprint>;

export interface SearchSprintQuery extends PaginationQuery {
  title?: string;
  teamId?: number;
}

export interface UpdateSprintRequest extends CreateSprintRequest {
  id?: number;
}

export interface CreateSprintRequest {
  title: string;
  teamId?: number;
  startDate?: Date;
  endDate?: Date;
}
export interface SearchSprintFormValues {
  title?: string;
  teamId?: number;
}

// End Team
