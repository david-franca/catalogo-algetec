import dayjs from "dayjs";
import { filter, groupBy, isNull } from "lodash";

import {
  DemandChecklist,
  DemandShow,
  DemandStatus,
  DemandUpdateForm,
  TeamLog,
} from "@/types/demand";
import { Files } from "@/types/files";
import { Issue } from "@/types/issue";
import { SelectOptions } from "@/types/select";

import { handlePriority } from "./handlePriority";
import { handleStringDate } from "./handleStringDate";
import { isBusinessDay, numberOfBusinessDays } from "./isBusinessDay";

export class HandleDemand {
  /**
   * toProduction
   */
  public static toProduction(demand: DemandShow) {
    const demandLogs = [...demand.demandLogs];
    const phases = [
      {
        type: "Roteirização",
        key: "scripting",
        log: demand.latest_scripting_log,
      },
      { type: "Programação", key: "coding", log: demand.latest_coding_log },
      { type: "Testes", key: "testing", log: demand.latest_testing_log },
      { type: "Modelagem", key: "modeling", log: demand.latest_modeling_log },
      { type: "UALAB", key: "ualab", log: demand.latest_ualab_log },
      { type: "Designing", key: "designing", log: demand.latest_designing_log },
    ];

    const production = phases.map(({ type, key, log }) => ({
      type,
      responsible:
        log?.demandLog_developers?.map((dev) => dev.name).join(", ") || "",
      started_at: handleStringDate(log?.started_at, "LLLL"),
      finished_at: handleStringDate(log?.finished_at, "LLLL"),
      progress: demand[key as keyof DemandShow],
      deadline: log?.deadline,
    }));

    const issuesGrouped = groupBy(demand.experiments.issues, "priority") as {
      [priority: string]: Issue[];
    };

    const issuesValues = Object.entries(issuesGrouped).map(
      ([priority, issues]) => {
        const uniqueStatuses = [
          ...new Set(issues.map((issue) => issue.status)),
        ];
        const statusCount = uniqueStatuses.map((status) => [
          status.toLowerCase(),
          issues.filter((issue) => issue.status === status).length,
        ]);
        const approvedCount = issues.filter((issue) => issue.approved).length;

        return {
          title: `${issues.length} problema${issues.length > 1 ? "s" : ""} com gravidade ${handlePriority(
            Number(priority),
            true
          )}`,
          approved: `${approvedCount} aprovado${approvedCount > 1 ? "s" : ""}`,
          status: `${statusCount[0][1]} ${statusCount[0][0]}`,
        };
      }
    );

    return {
      experimentName: demand.experiments.name,
      status: demand.status as DemandStatus,
      production,
      logs: demandLogs.sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      ),
      id: demand.experiment_id,
      issues: issuesValues,
    };
  }

  public static toUpdate(demand: DemandShow): DemandUpdateForm {
    const ualabDates = HandleDemand.handleLogDates(demand, "Ualab");
    const codingDates = HandleDemand.handleLogDates(demand, "Coding");
    const testingDates = HandleDemand.handleLogDates(demand, "Testing");
    const scriptingDates = HandleDemand.handleLogDates(demand, "Scripting");
    const modelingDates = HandleDemand.handleLogDates(demand, "Modeling");
    const designingDates = HandleDemand.handleLogDates(demand, "Designing");

    return {
      coding: demand.coding,
      coding_checklist: HandleDemand.handleChecklist(demand, "Coding"),
      coding_deadline: demand.latest_coding_log?.deadline,
      coding_developers: HandleDemand.demandLogDevelopers(demand, "Coding"),
      coding_files: HandleDemand.handleFiles(demand, "Coding"),
      coding_finishedAt: codingDates?.finishedAt
        ? dayjs(codingDates?.finishedAt)
        : undefined,
      coding_message: numberOfBusinessDays(
        codingDates?.startedAt,
        codingDates?.finishedAt
      )?.message,
      coding_percent: HandleDemand.getPercent(demand, "Coding"),
      coding_startedAt: codingDates?.startedAt
        ? dayjs(codingDates?.startedAt)
        : undefined,
      demandTags: demand.demandTags,
      designing: demand.ualab,
      designing_checklist: HandleDemand.handleChecklist(demand, "Designing"),
      designing_deadline: demand.latest_designing_log?.deadline,
      designing_developers: HandleDemand.demandLogDevelopers(
        demand,
        "Designing"
      ),
      designing_files: HandleDemand.handleFiles(demand, "Designing"),
      designing_finishedAt: designingDates?.finishedAt
        ? dayjs(designingDates?.finishedAt)
        : undefined,
      designing_message: numberOfBusinessDays(
        designingDates?.startedAt,
        designingDates?.finishedAt
      )?.message,
      designing_percent: HandleDemand.getPercent(demand, "Designing"),
      designing_startedAt: designingDates?.startedAt
        ? dayjs(designingDates?.startedAt)
        : undefined,
      experiment_id: demand.experiments.id,
      id: demand.id,
      institution_id: demand.institutions.id,
      logger_id: 0,
      modeling: demand.modeling,
      modeling_checklist: HandleDemand.handleChecklist(demand, "Modeling"),
      modeling_deadline: demand.latest_modeling_log?.deadline,
      modeling_developers: HandleDemand.demandLogDevelopers(demand, "Modeling"),
      modeling_files: HandleDemand.handleFiles(demand, "Modeling"),
      modeling_finishedAt: modelingDates?.finishedAt
        ? dayjs(modelingDates?.finishedAt)
        : undefined,
      modeling_message: numberOfBusinessDays(
        modelingDates?.startedAt,
        modelingDates?.finishedAt
      )?.message,
      modeling_percent: HandleDemand.getPercent(demand, "Modeling"),
      modeling_startedAt: modelingDates?.startedAt
        ? dayjs(modelingDates?.startedAt)
        : undefined,
      scripting: demand.scripting,
      scripting_checklist: HandleDemand.handleChecklist(demand, "Scripting"),
      scripting_deadline: demand.latest_scripting_log?.deadline,
      scripting_developers: HandleDemand.demandLogDevelopers(
        demand,
        "Scripting"
      ),
      scripting_files: HandleDemand.handleFiles(demand, "Scripting"),
      scripting_finishedAt: scriptingDates?.finishedAt
        ? dayjs(scriptingDates?.finishedAt)
        : undefined,
      scripting_message: numberOfBusinessDays(
        scriptingDates?.startedAt,
        scriptingDates?.finishedAt
      )?.message,
      scripting_percent: HandleDemand.getPercent(demand, "Scripting"),
      scripting_startedAt: scriptingDates?.startedAt
        ? dayjs(scriptingDates?.startedAt)
        : undefined,
      status: demand.status as DemandStatus,
      testing: demand.testing,
      testing_checklist: HandleDemand.handleChecklist(demand, "Testing"),
      testing_deadline: demand.latest_testing_log?.deadline,
      testing_developers: HandleDemand.demandLogDevelopers(demand, "Testing"),
      testing_files: HandleDemand.handleFiles(demand, "Testing"),
      testing_finishedAt: testingDates?.finishedAt
        ? dayjs(testingDates?.finishedAt)
        : undefined,
      testing_message: numberOfBusinessDays(
        testingDates?.startedAt,
        testingDates?.finishedAt
      )?.message,
      testing_percent: HandleDemand.getPercent(demand, "Testing"),
      testing_startedAt: testingDates?.startedAt
        ? dayjs(testingDates?.startedAt)
        : undefined,
      ualab: demand.ualab,
      ualab_checklist: HandleDemand.handleChecklist(demand, "Ualab"),
      ualab_deadline: demand.latest_ualab_log?.deadline,
      ualab_developers: HandleDemand.demandLogDevelopers(demand, "Ualab"),
      ualab_files: HandleDemand.handleFiles(demand, "Ualab"),
      ualab_finishedAt: ualabDates?.finishedAt
        ? dayjs(ualabDates?.finishedAt)
        : undefined,
      ualab_message: numberOfBusinessDays(
        ualabDates?.startedAt,
        ualabDates?.finishedAt
      )?.message,
      ualab_percent: HandleDemand.getPercent(demand, "Ualab"),
      ualab_startedAt: ualabDates?.startedAt
        ? dayjs(ualabDates?.startedAt)
        : undefined,
    };
  }

  private static handleLogDates(demand: DemandShow, team: TeamLog) {
    const lastLog = HandleDemand.handleLatestLog(demand, team);
    if (lastLog) {
      const startedAt = new Date(lastLog.started_at);
      const finishedAt = new Date(lastLog.finished_at);

      return { startedAt, finishedAt };
    }
    return undefined;
  }

  private static handleLatestLog(demand: DemandShow, team: TeamLog) {
    switch (team) {
      case "Coding":
        return demand.latest_coding_log;
      case "Designing":
        return demand.latest_designing_log;
      case "Modeling":
        return demand.latest_modeling_log;
      case "Scripting":
        return demand.latest_scripting_log;
      case "Testing":
        return demand.latest_testing_log;
      case "Ualab":
        return demand.latest_ualab_log;
      default:
        return null;
    }
  }

  private static handleChecklist(
    demand: DemandShow,
    team: TeamLog
  ): DemandChecklist | undefined {
    switch (team) {
      case "Coding":
        return demand.latest_coding_log?.checklist;
      case "Designing":
        return demand.latest_designing_log?.checklist;
      case "Modeling":
        return demand.latest_modeling_log?.checklist;
      case "Scripting":
        return demand.latest_scripting_log?.checklist;
      case "Testing":
        return demand.latest_testing_log?.checklist;
      case "Ualab":
        return demand.latest_ualab_log?.checklist;
      default:
        return undefined;
    }
  }

  private static demandLogDevelopers(
    demand: DemandShow,
    team: TeamLog
  ): SelectOptions[] | undefined {
    const lastLog = HandleDemand.handleLatestLog(demand, team);
    if (lastLog) {
      return lastLog.demandLog_developers.map((developer) => ({
        value: developer.id.toString(),
        label: developer.name,
      }));
    }
    return undefined;
  }

  static getDates(
    demand: DemandShow,
    team: TeamLog,
    allDays?: boolean
  ): Date[] {
    const logDates = HandleDemand.handleLogDates(demand, team);
    const dates = [];

    if (logDates) {
      const { finishedAt, startedAt } = logDates;
      for (let i = startedAt; i <= finishedAt; i.setDate(i.getDate() + 1)) {
        if (isBusinessDay(dayjs(i))) {
          dates.push(new Date(i));
        }
        if (allDays && !isBusinessDay(dayjs(i))) {
          dates.push(new Date(i));
        }
      }
    }

    return dates;
  }

  static verifyDate(demand: DemandShow, team: TeamLog): number {
    const today = new Date();
    const teamDates = HandleDemand.getDates(demand, team);

    return (
      teamDates.findIndex(
        (date) =>
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear()
      ) + 1
    );
  }

  static getPercent(demand: DemandShow, team: TeamLog): number {
    const todayIndex = HandleDemand.verifyDate(demand, team);

    if (todayIndex === 0) {
      return 100;
    }

    const teamDates = HandleDemand.getDates(demand, team);

    return Math.round((todayIndex * 100) / teamDates.length);
  }

  private static handleFiles(demand: DemandShow, team: TeamLog) {
    const files = demand.files.map((file) =>
      file.department.name === team ? file : null
    );
    return filter(files, (file) => !isNull(file)) as Files[];
  }
}
