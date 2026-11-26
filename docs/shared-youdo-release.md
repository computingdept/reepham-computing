# Shared You Do release (J277 and H446)

After editing a shared You Do asset, run from the repository root:

```sh
node scripts/release-youdo.cjs --write
node scripts/release-youdo.cjs --check
node --test tests/release-youdo.test.cjs
```

Commit the shared asset change and generated URL-only diff together, then use the existing publishing process. The script computes one content fingerprint and updates existing references in H446 and J277 classroom entry pages, nested shared CSS imports and the two J277 generated lesson loaders. It is idempotent; `--check` never writes. It does not enroll legacy lesson controllers, alter assessment modes, change Code First, rewrite questions or answers, change any authored layout exceptions, or change deployment. Review the diff and verify classroom rendering before publishing.

Standalone specialist and timed assessment controllers remain separate. Ordinary lesson renderers not yet linked to the shared assets require an explicit, tested migration. Line-by-line mark scheme presentation is a separate UI task.

## Repository-wide release without manual batches

The GitHub Actions **Shared You Do release** workflow runs the unit tests and one complete reference refresh from a checked-out copy of the repository. It creates a separate release branch (no auto-publish to main). Review the resulting commit, run the existing browser audit or smoke checks, and merge the approved branch using the normal publishing route. A manual run can be started from the Actions page. The refresh includes legacy J277 adapters, unified stylesheet and Year 11 preview asset URLs; it does not turn on any preview flags, alter their content or change specialist navigation.

A version refresh does not itself migrate an unenrolled renderer. Those controllers must first be verified against the shared classroom contract.
